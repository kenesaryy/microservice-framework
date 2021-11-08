import { SerializableCapsule } from '../serializable/serializable-capsule/serializable-capsule';
import { Message } from './message';

export type InferMessageBusSerializable<
  M extends Message<any, any>,
> = M extends Message<SerializableCapsule<infer S>, any> ? S : never;
