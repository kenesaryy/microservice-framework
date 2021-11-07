import { Handler } from '../../handler/handler';
import { Message, MessageProps } from '../../message/message';
import { Serializable } from '../../serializable/serializable';
import { InstanceSC } from '../../serializable/serializable-capsule/instance-serializable-capsule';
import { UnitOfWork } from '../../unit-of-work/unit-of-work';
import { asyncLocalStorage, getCurrentUnitOfWork } from './async-local-storage';

export class HandlerRunningLogic {
  async handle<M extends Message<InstanceSC<Serializable>, MessageProps<InstanceSC<Serializable>>>, RES>(
    message: M,
    handler: Handler<M, RES>,
  ): Promise<RES> {
    const parentUOW = getCurrentUnitOfWork();
    const uow = UnitOfWork.create(parentUOW);
    const res = await asyncLocalStorage.run(
      {
        uow,
      },
      async (): Promise<RES> => {
        return this.runHandle(
          uow,
          message,
          handler,
        );
      },
    )
    return res;
  }

  protected async runHandle<M extends Message<InstanceSC<Serializable>, MessageProps<InstanceSC<Serializable>>>, RES>(
    uow: UnitOfWork,
    message: M,
    handler: Handler<M, RES>,
  ): Promise<RES> {
    await uow.start();
    try {
      const res = await handler.handle(message);
      await uow.commit();
      await uow.close();
      return res;
    } catch(err) {
      await uow.rollback();
      await uow.close();
      throw err;
    }
  }
}
