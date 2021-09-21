import { Serializable } from '../serializable/serializable';
import { InstanceSC } from '../serializable/serializable-capsule/instance-serializable-capsule';
import { Message, MessageProps } from './message';

export interface CommandMessageProps<P extends Serializable> extends MessageProps<InstanceSC<P>> {}

export class CommandMessage<P extends Serializable> extends Message<InstanceSC<P>, CommandMessageProps<P>> {
}
