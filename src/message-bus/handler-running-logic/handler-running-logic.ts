import { Queue } from '../../base/utils/queue';
import { InternalError } from '../../errors';
import { Handler } from '../../handler/handler';
import { HandlableMessage } from '../../message/types';
import { Serializable } from '../../serializable/serializable';
import { UnitOfWork } from '../../unit-of-work/unit-of-work';
import { DefaultIntercepterChain } from '../interceptor/default-intercepter-chain';
import { InterceptorChain } from '../interceptor/intercepter-chain';
import { MessageHandlerInterceptor } from '../interceptor/message-handler-interceptor';
import { asyncLocalStorage, getCurrentUnitOfWork } from './async-local-storage';

export class HandlerRunningLogic {
  async handle<M extends HandlableMessage<Serializable>, RES>(
    message: M,
    handler: Handler<M, RES>,
    handleInterceptors: Queue<MessageHandlerInterceptor<Handler<M, RES>>>,
  ): Promise<RES> {
    const parentUOW = getCurrentUnitOfWork();
    const uow = UnitOfWork.create(
      message,
      parentUOW,
    );
    const handlerInterceptorChain = new DefaultIntercepterChain(
      uow,
      handleInterceptors.values(),
      handler,
      message,
    );
    const res = await asyncLocalStorage.run(
      {
        uow,
      },
      async (): Promise<RES> => {
        return this.runHandle(
          uow,
          handlerInterceptorChain,
        );
      },
    )
    return res;
  }

  protected async runHandle<M extends HandlableMessage<Serializable>, RES>(
    uow: UnitOfWork<M>,
    handlerInterceptorChain: InterceptorChain<Handler<M, RES>>,
  ): Promise<RES> {
    try {
      await uow.start();
      try {
        // const res = await handler.handle(message);
        const res = await handlerInterceptorChain.proceed();
        await uow.commit();
        await uow.close();
        return res;
      } catch(err) {
        await uow.rollback();
        await uow.close();
        throw err;
      }
    } catch(err) {
      throw new InternalError(); // Может быть, надо будет добавить возможность на расширение
    }
  }
}
