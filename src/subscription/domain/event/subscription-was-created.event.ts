import { DomainEvent } from '../../../core/domain';

export class SubscriptionWasCreated implements DomainEvent {
    public constructor(
        public readonly id: string,
        public readonly categoryId: string,
        public readonly userId: string,
    ) {}
}
