import { Serializable } from '../serializable/serializable';
import { InstanceSC } from '../serializable/serializable-capsule/instance-serializable-capsule';
import { Message, MessageProps } from './message';

export interface QueryMessageProps<P extends Serializable> extends MessageProps<InstanceSC<P>> {}

export class QueryMessage<P extends Serializable> extends Message<InstanceSC<P>, QueryMessageProps<P>> {
}
