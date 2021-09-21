import { v4, validate } from 'uuid';

export class UUID {
  protected constructor(protected readonly rawUuid: string) {}

  static create(rawUuid: string): UUID | undefined;

  static create(): UUID;

  static create(rawUuid?: string): UUID | undefined {
    if (rawUuid && !validate(rawUuid)) return undefined;
    return new UUID(rawUuid || v4());
  }

  getRawUuid(): string {
    return this.rawUuid;
  }
}
