import { CommandMessage } from '../message/command-message';
import { ResponseMessage } from '../message/response-message';
import { Serializable } from '../serializable/serializable';
import { SerializableCapsule } from '../serializable/serializable-capsule/serializable-capsule';
import { HandlerWithResponse } from './handler-with-response';

export interface CommandHandler<
  C extends CommandMessage<Serializable>,
  R extends ResponseMessage<SerializableCapsule<Serializable>>
> extends HandlerWithResponse<C, R> {}
