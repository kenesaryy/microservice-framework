import { GeneralHandler, InferResFromHandler } from '../../handler/types';

export interface InterceptorChain<H extends GeneralHandler> {
  proceed(): Promise<InferResFromHandler<H>>;
}
