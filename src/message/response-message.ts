import { Serializable } from '../serializable/serializable';
import { SerializableCapsule } from '../serializable/serializable-capsule/serializable-capsule';
import { Message, MessageProps } from './message';

export interface ResponseMessageProps<P extends SerializableCapsule<Serializable>> extends MessageProps<P> {}

export class ResponseMessage<P extends SerializableCapsule<Serializable>> extends Message<P, ResponseMessageProps<P>> {
}
