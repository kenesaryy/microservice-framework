import { PartialOptional } from '../base/types';
import { UUID } from '../base/uuid';
import { Serializable } from '../serializable/serializable';
import { SerializableCapsule } from '../serializable/serializable-capsule/serializable-capsule';

export interface MessageProps<P extends SerializableCapsule<Serializable>> {
  readonly id: UUID,
  readonly timeStamp: Date,
  readonly payload: P,
  readonly source: string,
  readonly metadata: Record<string, any>,
};

export abstract class Message<P extends SerializableCapsule<Serializable>, PROPS extends MessageProps<P>> {
  protected props: PROPS;

  constructor(
    props: PartialOptional<PROPS, 'id' | 'timeStamp'>,
  ) {
    this.props = {
      ...props as Exclude<PROPS, { id: UUID, timeStamp: Date }>,
      id: props.id || UUID.create(),
      timeStamp: props.timeStamp || new Date(),
    };
  }

  getPayload(): P {
    return this.props.payload;
  }

  getId(): UUID {
    return this.props.id;
  }

  getTimestamp(): Date {
    return this.props.timeStamp;
  }

  getSource(): string {
    return this.props.source;
  }

  getMetadata(): Record<string, any> {
    return this.props.metadata;
  }
}
