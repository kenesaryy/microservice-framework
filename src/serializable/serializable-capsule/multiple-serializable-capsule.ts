import { Serializable, SerializableConstructor } from "../serializable";
import { SerializableCapsule } from "./serializable-capsule";

export class MultipleSerializableCapsule<S extends Serializable> implements SerializableCapsule<S[]> {
  public serializableConstructor: SerializableConstructor<S>;
  protected serializables: S[];

  constructor(serializableConstr: SerializableConstructor<S>, serializables?: S[]) {
    this.serializableConstructor = serializableConstr;
    this.serializables = serializables || [];
  }

  get(): S[] | undefined {
    return [...this.serializables];
  }

  match(sC: SerializableCapsule<Serializable>): sC is this {
    if (sC instanceof MultipleSerializableCapsule && sC.serializableConstructor === this.serializableConstructor) {
      return true;
    }
    return false;
  }

  add(serializable: S): void {
    this.serializables.push(serializable);
  }
}
