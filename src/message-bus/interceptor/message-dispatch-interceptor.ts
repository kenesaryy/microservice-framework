import { GeneralHandlableMessage } from '../../message/types';

export interface MessageDispatchInterceptor<M extends GeneralHandlableMessage> {
  handle(message: M): Promise<M>;
}
