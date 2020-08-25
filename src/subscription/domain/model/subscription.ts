import { CategoryId } from '../../../category/domain/model/category-id';
import { AggregateRoot } from '../../../core/domain';
import { UserId } from '../../../user/domain/model/user-id';
import {
    SubscriptionWasCreated,
} from '../event/subscription-was-created.event';
import {
    SubscriptionWasRemoved,
} from '../event/subscription-was-removed.event';
import { SubscriptionId } from './subscription-id';

export class Subscription extends AggregateRoot {
    private _subscriptionId: SubscriptionId;
    private _userId: UserId;
    private _categoryId: CategoryId;

    private constructor() {
        super();
    }

    public static add(id: SubscriptionId, userId: UserId, categoryId: CategoryId): Subscription {
        const subscription = new Subscription();
        
        subscription.apply(new SubscriptionWasCreated(id.value, userId.value, categoryId.value));
        
        return subscription;
    }

    public delete(): void{
        this.apply(new SubscriptionWasRemoved(this.aggregateId()));
    }

    aggregateId(): string {
        return this._subscriptionId.value;
    }
    
    get id(): SubscriptionId {
        return this._subscriptionId;
    }

    get categoryId(): CategoryId {
        return this._categoryId;
    } 

    get userId() : UserId {
        return this._userId;
    }

    private onSubscriptionWasCreated(event: SubscriptionWasCreated) {
        this._subscriptionId = SubscriptionId.fromString(event.id);
        this._userId = UserId.fromString(event.userId);
        this._categoryId = CategoryId.fromString(event.categoryId);        
    }
}
