import { AsyncLocalStorage } from 'async_hooks';
import { GeneralMessage } from '../../message/types';
import { UnitOfWork } from '../../unit-of-work/unit-of-work';

export const asyncLocalStorage = new AsyncLocalStorage();

export interface Store {
  uow: UnitOfWork<GeneralMessage>;
}

export function getCurrentUnitOfWork(): UnitOfWork<GeneralMessage> | undefined {
  const store = asyncLocalStorage.getStore() as Store | undefined;
  if(!store) return;
  return store.uow;
}
