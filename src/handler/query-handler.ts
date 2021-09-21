import { QueryMessage } from '../message/query-message';
import { ResponseMessage } from '../message/response-message';
import { Serializable } from '../serializable/serializable';
import { SerializableCapsule } from '../serializable/serializable-capsule/serializable-capsule';
import { HandlerWithResponse } from './handler-with-response';

export interface QueryHandler<
  Q extends QueryMessage<Serializable>,
  R extends ResponseMessage<SerializableCapsule<Serializable>>
> extends HandlerWithResponse<Q, R> {}
