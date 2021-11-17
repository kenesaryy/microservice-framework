import { CommandMessage } from '../message/command-message';
import { Message, MessageProps } from '../message/message';
import { ResponseMessage } from '../message/response-message';
import { GeneralMessage } from '../message/types';
import { Serializable } from '../serializable/serializable';
import { InstanceSC } from '../serializable/serializable-capsule/instance-serializable-capsule';
import { SerializableCapsule } from '../serializable/serializable-capsule/serializable-capsule';
import { CommandHandler } from './command-handler';
import { Handler } from './handler';

export type GeneralHandler = Handler<
  Message<InstanceSC<Serializable>, MessageProps<InstanceSC<Serializable>>>,
  any
>;

export type InferResFromHandler<H extends GeneralHandler> = H extends Handler<
  GeneralMessage,
  infer RES
> ? RES : never;

export type InferMessageFromHandler<H extends GeneralHandler> = H extends Handler<
  infer M,
  any
> ? M : never;

export type GeneralCommandHandler = CommandHandler<
  CommandMessage<Serializable>,
  ResponseMessage<SerializableCapsule<Serializable>>
>;
