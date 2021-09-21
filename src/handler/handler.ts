import { Message, MessageProps } from '../message/message';
import { Serializable } from '../serializable/serializable';
import { InstanceSC } from '../serializable/serializable-capsule/instance-serializable-capsule';

export interface Handler<
  M extends Message<InstanceSC<Serializable>, MessageProps<InstanceSC<Serializable>>>,
> {}
