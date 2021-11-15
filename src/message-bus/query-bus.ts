import { QueryHandler } from '../handler/query-handler';
import { QueryMessage } from '../message/query-message';
import { ResponseMessage } from '../message/response-message';
import { Serializable } from '../serializable/serializable';
import { SerializableCapsule } from '../serializable/serializable-capsule/serializable-capsule';
import { MessageBusWithResponse } from './message-bus-with-response';
import { ResponseCallback } from './response-callback/response-callback';

export abstract class QueryBus<
  S extends Serializable,
  H extends QueryHandler<S, ResponseMessage<SerializableCapsule<Serializable>>>
> extends MessageBusWithResponse<S, H> {
  abstract dispatch<S extends Serializable, M extends QueryMessage<S>>(
    message: M,
    callback: ResponseCallback<M, any>,
  ): Promise<void>;
}
