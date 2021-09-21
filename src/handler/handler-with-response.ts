import { CommandMessage } from '../message/command-message';
import { QueryMessage } from '../message/query-message';
import { ResponseMessage } from '../message/response-message';
import { Serializable } from '../serializable/serializable';
import { SerializableCapsule } from '../serializable/serializable-capsule/serializable-capsule';

export interface HandlerWithResponse<
  M extends QueryMessage<Serializable> | CommandMessage<Serializable>,
  R extends ResponseMessage<SerializableCapsule<Serializable>>
> {
  handle(message: M): Promise<R>;
}
