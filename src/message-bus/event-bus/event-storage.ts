import { EventMessage } from '../../message/event-message';
import { Serializable } from '../../serializable/serializable';

export interface EventStorage {
  save(events: EventMessage<Serializable>[]): Promise<void>;
}
