import { GeneralHandler, InferMessageFromHandler, InferResFromHandler } from '../../handler/types';
import { UnitOfWork } from '../../unit-of-work/unit-of-work';
import { InterceptorChain } from './intercepter-chain';
import { MessageHandlerInterceptor } from './message-handler-interceptor';

export class DefaultIntercepterChain<H extends GeneralHandler> implements InterceptorChain<H> {
  constructor(
    private readonly uow: UnitOfWork<InferMessageFromHandler<H>>,
    private readonly chain: Iterator<MessageHandlerInterceptor<H>>,
    private readonly handler: H,
    private readonly message: InferMessageFromHandler<H>,
  ) {}

  async proceed(): Promise<InferResFromHandler<H>> {
    const next = this.chain.next();
    if (!next.done) {
      return next.value.handle(
        this.uow,
        this,
      );
    } else {
      return this.handler.handle(
        this.message,
      );
    }
  }
}
