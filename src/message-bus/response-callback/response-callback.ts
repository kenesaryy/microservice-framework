import { CommandMessage } from '../../message/command-message';
import { QueryMessage } from '../../message/query-message';
import { ResponseMessage } from '../../message/response-message';
import { Serializable } from '../../serializable/serializable';
import { SerializableCapsule } from '../../serializable/serializable-capsule/serializable-capsule';

interface HandleLogic<
  M extends CommandMessage<Serializable> | QueryMessage<Serializable>,
  SC extends SerializableCapsule<Serializable>
> {
  (message: M, resp: ResponseMessage<SC>): Promise<void>;
}

interface ErrorHandleLogic<ERR> {
  (err: ERR): Promise<void>;
}

export class ResponseCallback<
  M extends CommandMessage<Serializable> | QueryMessage<Serializable>,
  ERR
> {
  // Порядок регистрации responseTypeAndHandleLogic важен
  private responseTypeAndHandleLogic: [SerializableCapsule<Serializable>, HandleLogic<M, SerializableCapsule<Serializable>>][] = [];
  private onErrorHandler?: ErrorHandleLogic<any>;

  onResponse<SC extends SerializableCapsule<Serializable>>(
    responseType: SC,
    handleLogic: HandleLogic<M, SC>,
  ): void {
    // TODO надо добавить проверку дублирования
    this.responseTypeAndHandleLogic.push(
      [
        responseType,
        handleLogic as HandleLogic<M, SerializableCapsule<Serializable>>,
      ]
    );
  }

  onError(errorHandleLogic: ErrorHandleLogic<ERR>): void {
    if (this.onErrorHandler) throw new Error('Повторная попытка регистрировать ErrorHandleLogic');
    this.onErrorHandler = errorHandleLogic;
  }

  async responseReceived(
    message: M,
    resp: ResponseMessage<SerializableCapsule<Serializable>>
  ): Promise<void> {
    const handleLogic = this.getMatchedHandleLogic(resp.getPayload());
    if (!handleLogic) throw new Error('Не подходит ни один response'); // TODO
    await handleLogic(
      message,
      resp,
    );
  }

  async errorReceived(
    err: ERR,
  ): Promise<void> {
    if (!this.onErrorHandler) throw new Error(); // TODO
    await this.onErrorHandler(err);
  }

  private getMatchedHandleLogic<SC extends SerializableCapsule<Serializable>>(
    respPayload: SC,
  ): HandleLogic<M, SC> | undefined {
    let res: HandleLogic<M, SC> | undefined = undefined;
    this.responseTypeAndHandleLogic.some((value) => {
      if (value[0].match(respPayload)) {
        res = value[1];
        return true;
      }
      return false;
    })
    return res;
  }
}
