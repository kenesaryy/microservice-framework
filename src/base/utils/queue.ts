export interface Queue<T> {
  push(value: T): void;
  shift(): T | undefined;
  values(): Iterator<T>;
}
