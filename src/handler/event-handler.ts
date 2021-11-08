import { EventMessage } from '../message/event-message';
import { Serializable } from '../serializable/serializable';
import { Handler } from './handler';

export interface EventHandler<S extends Serializable> extends Handler<EventMessage<S>, void> {
  // handle(event: E): Promise<void>;
}
