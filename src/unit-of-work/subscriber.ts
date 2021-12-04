import { GeneralHandlableMessage } from '../message/types';
import { UnitOfWork } from './unit-of-work';

export interface Subscriber {
  (unitOfWork: UnitOfWork<GeneralHandlableMessage>): Promise<void>;
}
