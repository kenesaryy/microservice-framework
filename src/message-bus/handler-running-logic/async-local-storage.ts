import { AsyncLocalStorage } from 'async_hooks';
import { UnitOfWork } from '../../unit-of-work/unit-of-work';

export const asyncLocalStorage = new AsyncLocalStorage();

export interface Store {
  uow: UnitOfWork;
}

export function getCurrentUnitOfWork(): UnitOfWork | undefined {
  const store = asyncLocalStorage.getStore() as Store | undefined;
  if(!store) return;
  return store.uow;
}
