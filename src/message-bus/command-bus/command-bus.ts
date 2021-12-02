import { CommandHandler } from '../../handler/command-handler';
import { CommandMessage } from '../../message/command-message';
import { ResponseMessage } from '../../message/response-message';
import { Serializable } from '../../serializable/serializable';
import { SerializableCapsule } from '../../serializable/serializable-capsule/serializable-capsule';
import { MessageBusWithResponse } from '../message-bus-with-response';
import { ResponseCallback } from '../response-callback/response-callback';

export abstract class CommandBus extends MessageBusWithResponse<
  Serializable, CommandHandler<Serializable, ResponseMessage<SerializableCapsule<Serializable>>>
> {
  abstract dispatch<S extends Serializable, M extends CommandMessage<S>>(
    message: M,
    callback: ResponseCallback<M, any>,
  ): Promise<void>;
}
