import { Constructor } from '../base/constructor';
import { Queue } from '../base/utils/queue';
import { GeneralHandler, InferMessageFromHandler } from '../handler/types';
import { Serializable } from '../serializable/serializable';
import { HandlerRunningLogic } from './handler-running-logic/handler-running-logic';
import { MessageDispatchInterceptor } from './interceptor/message-dispatch-interceptor';
import { MessageHandlerInterceptor } from './interceptor/message-handler-interceptor';

export abstract class MessageBus<
  S extends Serializable,
  H extends GeneralHandler
> {
  protected handlerRunningLogic: HandlerRunningLogic = new HandlerRunningLogic(); // TODO

  protected readonly handleInterceptors: Queue<MessageHandlerInterceptor<H>> = [];

  protected readonly dispatchInterceptors: Queue<MessageDispatchInterceptor<InferMessageFromHandler<H>>> = [];

  abstract subscribe<
    SERIALIZABLE extends S,
    HANDLER extends H,
  >(
    sConstr: Constructor<SERIALIZABLE>, handler: HANDLER,
  ): Promise<void>;

  async intercept<M extends InferMessageFromHandler<H>>(message: M): Promise<M> {
    const dIs = this.dispatchInterceptors.values();
    let res = message;
    while(true) {
      const interceptor = dIs.next();
      if (interceptor.done) break;
      res = await interceptor.value.handle(res) as M;
    }
    return res;
  }
}
