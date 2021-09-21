import { UUID } from '../base/uuid';
import { Serializable } from '../serializable/serializable';
import { SerializableCapsule } from '../serializable/serializable-capsule/serializable-capsule';
import { Message, MessageProps } from './message';

export interface EventMessageProps<P extends SerializableCapsule<Serializable>> extends MessageProps<P> {
  aggregateType: string;
  aggregateId: UUID;
}

export class EventMessage<P extends SerializableCapsule<Serializable>> extends Message<P, EventMessageProps<P>> {
  getAggregateType(): string {
    return this.props.aggregateType;
  }

  getAggregateId(): UUID {
    return this.props.aggregateId;
  }
}
