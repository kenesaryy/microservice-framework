import { Serializable } from '../serializable';

export interface SerializableCapsule<S extends Serializable> {
  get(): S | undefined;
  match(sc: SerializableCapsule<Serializable>): sc is this;
}
