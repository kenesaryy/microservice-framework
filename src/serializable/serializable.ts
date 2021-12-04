import { Constructor } from '../base/constructor';

export interface Serializable {}

export interface SerializableConstructor<S extends Serializable> extends Constructor<S> {
  // Формат UUID
  readonly typeGlobalId: string;
}
