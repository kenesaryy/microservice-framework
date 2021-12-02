import { EventHandler } from '../../handler/event-handler';
import { EventMessage } from '../../message/event-message';
import { Serializable } from '../../serializable/serializable';
import { MessageBus } from '../message-bus';

export abstract class EventBus extends MessageBus<Serializable, EventHandler<Serializable>> {
  abstract dispatch<S extends Serializable, M extends EventMessage<S>>(
    message: M,
  ): Promise<void>;
}
