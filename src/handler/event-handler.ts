import { EventMessage } from '../message/event-message';
import { Serializable } from '../serializable/serializable';
import { Handler } from './handler';

export interface EventHandler<E extends EventMessage<Serializable>> extends Handler<E, void> {
  // handle(event: E): Promise<void>;
}
