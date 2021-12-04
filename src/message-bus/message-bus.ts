import { Queue } from '../base/utils/queue';
import { GeneralHandler, InferMessageFromHandler } from '../handler/types';
import { Serializable, SerializableConstructor } from '../serializable/serializable';
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
    sConstr: SerializableConstructor<SERIALIZABLE>, handler: HANDLER,
  ): Promise<void>;

  protected async intercept<M extends InferMessageFromHandler<H>>(message: M): Promise<M> {
    const dIs = this.dispatchInterceptors.values();
    let res = message;
    while(true) {
      const interceptor = dIs.next();
      if (interceptor.done) break;
      res = await interceptor.value.handle(res) as M;
    }
    return res;
  }

  registerHandleInterceptor(
    interceptor: MessageHandlerInterceptor<H>,
  ): void {
    this.handleInterceptors.push(interceptor); // TODO проверка
  }

  registerDispatchInterceptor(
    interceptor: MessageDispatchInterceptor<InferMessageFromHandler<H>>,
  ): void {
    this.dispatchInterceptors.push(interceptor); // TODO проверка
  }
}
