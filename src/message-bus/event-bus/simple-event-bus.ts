import { EventHandler } from '../../handler/event-handler';
import { EventMessage } from '../../message/event-message';
import { InferMessageBusSerializable } from '../../message/types';
import { Serializable, SerializableConstructor } from '../../serializable/serializable';
import { EventBus } from './event-bus';
import { EventStorage } from './event-storage';

export class SimpleEventBus extends EventBus {
  protected sConstrAndHandler: Map<
    SerializableConstructor<Serializable>,
    EventHandler<
      EventMessage<Serializable>
    >
  > = new Map();

  constructor(
    protected readonly eventStorage: EventStorage,
  ) {
    super();
  }

  // Эту логику надо вынести в базовую
  async dispatch<S extends Serializable, M extends EventMessage<S>>(
    message: M,
  ): Promise<void> {
    const interceptedMsg = await this.intercept(message);
    const handler = this.sConstrAndHandler.get(
      interceptedMsg.getPayload().serializableConstructor,
    );
    await this.saveEventMessage(interceptedMsg);
    if (!handler) return;
    await this.handlerRunningLogic.handle(
      interceptedMsg,
      handler as any,
      this.handleInterceptors as any, // TODO
    );
  }

  protected async saveEventMessage(message: EventMessage<Serializable>): Promise<void> {
    await this.eventStorage.save([message]);
  }

  async subscribe<
    M extends EventMessage<Serializable>,
    H extends EventHandler<InferMessageBusSerializable<M>>
  >(
    sConstr: SerializableConstructor<InferMessageBusSerializable<M>>,
    handler: H,
  ): Promise<void> {
    if (this.sConstrAndHandler.get(sConstr)) throw new Error(); // TODO
    this.sConstrAndHandler.set(sConstr, handler as EventHandler<any>);
  }
}
