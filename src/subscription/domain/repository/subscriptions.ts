import { Subscription } from '../model/subscription';
import { SubscriptionId } from '../model/subscription-id';

 export interface Subscriptions {
    find(subscriptionId: SubscriptionId): Promise<Subscription> | null;
    save(subscription: Subscription): void;
}

export const SUBSCRIPTIONS = 'SUBCRIPTIONS';
