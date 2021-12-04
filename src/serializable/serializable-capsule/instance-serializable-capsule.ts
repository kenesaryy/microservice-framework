import { Serializable, SerializableConstructor } from '../serializable';
import { SerializableCapsule } from './serializable-capsule';

export class InstanceSC<S extends Serializable> implements SerializableCapsule<S> {

  public serializableConstructor: SerializableConstructor<S>;
  protected serializable?: S;

  constructor (serializableConstructor: SerializableConstructor<S>);

  constructor (serializable: S);

  constructor (sOrSConstr: S | SerializableConstructor<S>) {
    if (typeof sOrSConstr !== 'function') {
      this.serializableConstructor = sOrSConstr.constructor as SerializableConstructor<S>;
      this.serializable = sOrSConstr as S;
    } else {
      this.serializableConstructor = sOrSConstr as SerializableConstructor<S>;
    }
  }

  get(): S | undefined {
    return this.serializable;
  }

  match(sc: SerializableCapsule<Serializable>): sc is this {
    if (sc instanceof InstanceSC && sc.serializableConstructor === this.serializableConstructor) {
      return true;
    }
    return false;
  }

  set(serializable: S): void {
    this.serializable = serializable;
  }
}
