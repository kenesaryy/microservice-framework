import { QueryHandler } from '../../handler/query-handler';
import { QueryMessage } from '../../message/query-message';
import { ResponseMessage } from '../../message/response-message';
import { InferMessageBusSerializable } from '../../message/types';
import { Serializable, SerializableConstructor } from '../../serializable/serializable';
import { SerializableCapsule } from '../../serializable/serializable-capsule/serializable-capsule';
import { ResponseCallback } from '../response-callback/response-callback';
import { QueryBus } from './query-bus';

export class SimpleQueryBus extends QueryBus {
  protected sConstrAndHandler: Map<
    SerializableConstructor<Serializable>,
    QueryHandler<
      QueryMessage<Serializable>,
      ResponseMessage<SerializableCapsule<Serializable>>
    >
  > = new Map();

  // Эту логику надо вынести в базовую
  async dispatch<S extends Serializable, M extends QueryMessage<S>>(
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
    M extends QueryMessage<Serializable>,
    H extends QueryHandler<InferMessageBusSerializable<M>, ResponseMessage<SerializableCapsule<Serializable>>>
  >(
    sConstr: SerializableConstructor<InferMessageBusSerializable<M>>,
    handler: H,
  ): Promise<void> {
    if (this.sConstrAndHandler.get(sConstr)) throw new Error(); // TODO
    this.sConstrAndHandler.set(sConstr, handler as QueryHandler<any, any>);
  }
}
