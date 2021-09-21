/**
 * Тип который аналогичен стандартному типу Partial,
 * но с добавленим возможности выборки ключей которых
 * нужно делать необязательными
 */
export type PartialOptional<T, KS extends keyof T> = {
  [P in KS]?: T[P];
} & {
  [P in Exclude<keyof T, KS>]: T[P];
};
