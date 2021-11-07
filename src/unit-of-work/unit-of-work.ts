import { UUID } from '../base/uuid';
import { Phase } from './phase';
import { Subscriber } from './subscriber';

export class UnitOfWork {
  protected phase: Phase;

  protected readonly subscribers: Map<Phase, Set<Subscriber>> = new Map();

  protected constructor(
    protected readonly id: UUID,
    protected readonly parent?: UnitOfWork,
    phase?: Phase, 
  ) {
    this.phase = phase || Phase.NOT_STARTED;
  }

  static create(parent?: UnitOfWork): UnitOfWork {
    return new UnitOfWork(
      UUID.create(),
      parent
    );
  }

  async start(): Promise<void> {
    if (this.phase !== Phase.NOT_STARTED) throw new Error(); // TODO
    await this.changePhase(Phase.STARTED);
  }

  async commit(): Promise<void> {
    if (this.phase !== Phase.STARTED) throw new Error(); // TODO
    await this.changePhase(Phase.BEFORE_COMMIT); // Before commit
    await this.changePhase(Phase.AFTER_COMMIT); // After commit
  }

  async rollback(): Promise<void> {
    if (this.phase !== Phase.STARTED) throw new Error(); // TODO
    await this.changePhase(Phase.ROLLED);
  }

  async close(): Promise<void> {
    if (this.phase === Phase.CLOSED) throw new Error(); // TODO
    await this.changePhase(Phase.CLOSED);
  }

  subscribe(phase: Phase, subscriber: Subscriber): void {
    if (this.phase === Phase.CLOSED) throw new Error(); // TODO
    const subscribersSet = this.subscribers.get(phase) || new Set();
    subscribersSet.add(subscriber);
    this.subscribers.set(phase, subscribersSet);
  }

  getParent(): UnitOfWork | undefined {
    return this.parent;
  }

  protected async notifySubscriber(subscriber: Subscriber): Promise<void> {
    await subscriber(this);
  }

  protected async notifySubscribers(subscribers: Set<Subscriber>): Promise<void>;
  protected async notifySubscribers(phase: Phase): Promise<void>;

  protected async notifySubscribers(arg: Phase | Set<Subscriber>): Promise<void> {
    if (typeof arg === 'object') {
      const all = Array.from(arg.values()).map((subscriber) => this.notifySubscriber(subscriber));
      await Promise.all(all);
    } else {
      const phase = arg;
      await this.notifySubscribers(this.subscribers.get(phase) || new Set());
      this.subscribers.set(phase, new Set());
    }
  }

  protected async changePhase(phase: Phase): Promise<void> {
    if (this.phase === Phase.CLOSED) throw new Error(); // TODO
    await this.notifySubscribers(this.phase);
    this.phase = phase;
    await this.notifySubscribers(this.phase);
  }
}
