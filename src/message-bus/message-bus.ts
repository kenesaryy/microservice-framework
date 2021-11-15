import { Constructor } from '../base/constructor';
import { Handler } from '../handler/handler';
import { Message, MessageProps } from '../message/message';
import { Serializable } from '../serializable/serializable';
import { InstanceSC } from '../serializable/serializable-capsule/instance-serializable-capsule';
import { HandlerRunningLogic } from './handler-running-logic/handler-running-logic';

export abstract class MessageBus<
  S extends Serializable,
  H extends Handler<Message<InstanceSC<S>, MessageProps<InstanceSC<S>>>, any>
> {
  protected handlerRunningLogic: HandlerRunningLogic = new HandlerRunningLogic(); // TODO

  abstract subscribe<
    SERIALIZABLE extends S,
    HANDLER extends H,
  >(
    sConstr: Constructor<SERIALIZABLE>, handler: HANDLER,
  ): Promise<void>;
}
