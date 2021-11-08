import { QueryMessage } from '../message/query-message';
import { ResponseMessage } from '../message/response-message';
import { Serializable } from '../serializable/serializable';
import { SerializableCapsule } from '../serializable/serializable-capsule/serializable-capsule';
import { Handler } from './handler';

export interface QueryHandler<
  Q extends Serializable,
  R extends ResponseMessage<SerializableCapsule<Serializable>>
> extends Handler<QueryMessage<Q>, R> {}
