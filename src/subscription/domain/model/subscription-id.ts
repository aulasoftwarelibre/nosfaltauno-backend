import { Id } from '../../../core/domain';

export class SubscriptionId extends Id {
    public static fromString(id: string) : SubscriptionId {
        return new SubscriptionId(id)
    }
}
