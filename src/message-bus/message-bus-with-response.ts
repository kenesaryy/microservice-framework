import { CommandHandler } from '../handler/command-handler';
import { QueryHandler } from '../handler/query-handler';
import { CommandMessage } from '../message/command-message';
import { QueryMessage } from '../message/query-message';
import { ResponseMessage } from '../message/response-message';
import { Serializable } from '../serializable/serializable';
import { SerializableCapsule } from '../serializable/serializable-capsule/serializable-capsule';
import { MessageBus } from './message-bus';
import { ResponseCallback } from './response-callback/response-callback';

export abstract class MessageBusWithResponse<
  S extends Serializable,
  H extends CommandHandler<S, ResponseMessage<SerializableCapsule<Serializable>>>
  | QueryHandler<S, ResponseMessage<SerializableCapsule<Serializable>>>
> extends MessageBus<S, H> {
  abstract dispatch<S extends Serializable, M extends CommandMessage<SerializableCapsule<S>> | QueryMessage<SerializableCapsule<S>>>(
    message: M,
    callback: ResponseCallback<M, any>,
  ): Promise<void>;
}
