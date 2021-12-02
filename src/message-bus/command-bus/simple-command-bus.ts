import { Constructor } from '../../base/constructor';
import { CommandHandler } from '../../handler/command-handler';
import { CommandMessage } from '../../message/command-message';
import { ResponseMessage } from '../../message/response-message';
import { InferMessageBusSerializable } from '../../message/types';
import { Serializable } from '../../serializable/serializable';
import { SerializableCapsule } from '../../serializable/serializable-capsule/serializable-capsule';
import { ResponseCallback } from '../response-callback/response-callback';
import { CommandBus } from './command-bus';

export class SimpleCommandBus extends CommandBus<
  CommandMessage<Serializable>,
  CommandHandler<
    Serializable,
    ResponseMessage<SerializableCapsule<Serializable>>
  >
> {
  protected sConstrAndHandler: Map<
    Constructor<Serializable>,
    CommandHandler<
      CommandMessage<Serializable>,
      ResponseMessage<SerializableCapsule<Serializable>>
    >
  > = new Map();

  // Эту логику надо вынести в базовую
  async dispatch<S extends Serializable, M extends CommandMessage<S>>(
    message: M,
    callback: ResponseCallback<M, any>,
  ): Promise<void> {
    const interceptedMsg = await this.intercept(message);
    const handler = this.sConstrAndHandler.get(
      interceptedMsg.getPayload().serializableConstructor,
    );
    if (!handler) throw new Error('Обработчик не найден'); // TODO
    const res = await this.handlerRunningLogic.handle(
      interceptedMsg,
      handler as any,
      this.handleInterceptors as any, // TODO
    );
    await callback.responseReceived(interceptedMsg, res as ResponseMessage<SerializableCapsule<Serializable>>);
  }

  async subscribe<
    M extends CommandMessage<Serializable>,
    H extends CommandHandler<InferMessageBusSerializable<M>, ResponseMessage<SerializableCapsule<Serializable>>>
  >(
    sConstr: Constructor<InferMessageBusSerializable<M>>,
    handler: H,
  ): Promise<void> {
    if (this.sConstrAndHandler.get(sConstr)) throw new Error(); // TODO
    this.sConstrAndHandler.set(sConstr, handler as CommandHandler<any, any>);
  }
}
