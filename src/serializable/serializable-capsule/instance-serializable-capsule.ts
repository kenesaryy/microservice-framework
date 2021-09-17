import { Constructor } from '../../base/constructor';
import { Serializable } from '../serializable';
import { SerializableCapsule } from './serializable-capsule';

export class InstanceSC<S extends Serializable> implements SerializableCapsule<S> {

  public serializableConstructor: Constructor<S>;
  protected serializable?: S;

  constructor (serializableConstructor: Constructor<S>);

  constructor (serializable: S);

  constructor (sOrSConstr: S | Constructor<S>) {
    if (Reflect.has(sOrSConstr, 'constructor')) {
      this.serializableConstructor = sOrSConstr.constructor as Constructor<S>;
      this.serializable = sOrSConstr as S;
    } else {
      this.serializableConstructor = sOrSConstr as Constructor<S>;
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
