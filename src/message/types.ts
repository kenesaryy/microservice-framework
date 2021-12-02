import { Serializable } from '../serializable/serializable';
import { InstanceSC } from '../serializable/serializable-capsule/instance-serializable-capsule';
import { SerializableCapsule } from '../serializable/serializable-capsule/serializable-capsule';
import { Message, MessageProps } from './message';

export type InferMessageBusSerializable<
  M extends Message<any, any>,
> = M extends Message<SerializableCapsule<infer S>, any> ? S : never;

export type GeneralMessage = Message<InstanceSC<Serializable>, MessageProps<InstanceSC<Serializable>>>;

export type HandlableMessage<S extends Serializable> =
  Message<InstanceSC<S>, MessageProps<InstanceSC<S>>>;

export type GeneralHandlableMessage = HandlableMessage<Serializable>;
