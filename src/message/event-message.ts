import { UUID } from '../base/uuid';
import { Serializable } from '../serializable/serializable';
import { InstanceSC } from '../serializable/serializable-capsule/instance-serializable-capsule';
import { Message, MessageProps } from './message';

export interface EventMessageProps<P extends Serializable> extends MessageProps<InstanceSC<P>> {
  aggregateType: string;
  aggregateId: UUID;
}

export class EventMessage<P extends Serializable> extends Message<InstanceSC<P>, EventMessageProps<P>> {
  getAggregateType(): string {
    return this.props.aggregateType;
  }

  getAggregateId(): UUID {
    return this.props.aggregateId;
  }
}
