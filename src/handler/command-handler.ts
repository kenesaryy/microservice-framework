import { CommandMessage } from '../message/command-message';
import { ResponseMessage } from '../message/response-message';
import { Serializable } from '../serializable/serializable';
import { SerializableCapsule } from '../serializable/serializable-capsule/serializable-capsule';
import { Handler } from './handler';

export interface CommandHandler<
  S extends Serializable,
  R extends ResponseMessage<SerializableCapsule<Serializable>>
> extends Handler<CommandMessage<S>, R> {}
