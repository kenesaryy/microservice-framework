import { Serializable } from '../serializable/serializable';
import { SerializableCapsule } from '../serializable/serializable-capsule/serializable-capsule';
import { Message, MessageProps } from './message';

export interface CommandMessageProps<P extends SerializableCapsule<Serializable>> extends MessageProps<P> {}

export class CommandMessage<P extends SerializableCapsule<Serializable>> extends Message<P, CommandMessageProps<P>> {
}
