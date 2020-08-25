import { DomainEvent } from '../../../core/domain';

export class SubscriptionWasRemoved implements DomainEvent {
    public constructor(
        public readonly id: string
    ) {}
}
