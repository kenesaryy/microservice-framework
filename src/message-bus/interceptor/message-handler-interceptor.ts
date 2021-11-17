import { GeneralHandler, InferMessageFromHandler, InferResFromHandler } from '../../handler/types';
import { UnitOfWork } from '../../unit-of-work/unit-of-work';
import { InterceptorChain } from './intercepter-chain';

export interface MessageHandlerInterceptor<H extends GeneralHandler> {
  handle(
    uow: UnitOfWork<InferMessageFromHandler<H>>,
    iChain: InterceptorChain<H>,
  ): Promise<InferResFromHandler<H>>;
}
