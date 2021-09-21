import { Serializable } from '../serializable/serializable';
import { SerializableCapsule } from '../serializable/serializable-capsule/serializable-capsule';
import { Message, MessageProps } from './message';

export interface QueryMessageProps<P extends SerializableCapsule<Serializable>> extends MessageProps<P> {}

export class QueryMessage<P extends SerializableCapsule<Serializable>> extends Message<P, QueryMessageProps<P>> {
}
