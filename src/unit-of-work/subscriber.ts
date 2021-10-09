import { UnitOfWork } from './unit-of-work';

export interface Subscriber {
  (unitOfWork: UnitOfWork): Promise<void>;
}
