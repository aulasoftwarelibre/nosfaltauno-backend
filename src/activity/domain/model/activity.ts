import { ActivityDescription } from '../../../activity/domain/model/activity-description';
import { ActivityTitle } from '../../../activity/domain/model/activity-title';
import { CategoryId } from '../../../category/domain/model/category-id';
import { AggregateRoot } from '../../../core/domain';
import { UserId } from '../../../user/domain/model/user-id';
import { ActivityWasCreated } from '../event/activity-was-created.event';
import { ActivityCapacity } from './activity-capacity';
import { ActivityContactInfo } from './activity-contact-info';
import { ActivityCreatedAt } from './activity-created-at';
import { ActivityDateLimit } from './activity-date-limit';
import { ActivityId } from './activity-id';

export class Activity extends AggregateRoot {
  private _activityId: ActivityId;
  private _creatorId: UserId;
  private _categoryId: CategoryId;
  private _title: ActivityTitle;
  private _description: ActivityDescription;
  private _capacity: ActivityCapacity;
  private _contactInfo: ActivityContactInfo;
  private _dateLimit: ActivityDateLimit;
  private _createdAt: ActivityCreatedAt;

  private constructor() {
    super();
  }

  public static add(
    id: ActivityId,
    creatorId: UserId,
    categoryId: CategoryId,
    title: ActivityTitle,
    description: ActivityDescription,
    capacity: ActivityCapacity,
    contactInfo: ActivityContactInfo,
    dateLimit: ActivityDateLimit,
    createdAt: ActivityCreatedAt,
  ): Activity {
    const activity = new Activity();

    activity.apply(
      new ActivityWasCreated(
        id.value,
        creatorId.value,
        categoryId.value,
        title.value,
        description.value,
        capacity.value,
        contactInfo.value,
        dateLimit.value,
        createdAt.value,
      ),
    );

    return activity;
  }

  aggregateId(): string {
    return this._activityId.value;
  }

  get id(): ActivityId {
    return this._activityId;
  }

  get creatorId(): UserId {
    return this._creatorId;
  }

  get categoryId(): CategoryId {
    return this._categoryId;
  }

  get title(): ActivityTitle {
    return this._title;
  }

  get description(): ActivityDescription {
    return this._description;
  }

  get capacity(): ActivityCapacity {
    return this._capacity;
  }

  get contactInfo(): ActivityContactInfo {
    return this._contactInfo;
  }

  get dateLimit(): ActivityDateLimit {
    return this._dateLimit;
  }

  get createdAt(): ActivityCreatedAt {
    return this._createdAt;
  }

  private onActivityWasCreated(event: ActivityWasCreated) {
    this._activityId = ActivityId.fromString(event.id);
    this._creatorId = UserId.fromString(event.creatorId);
    this._categoryId = CategoryId.fromString(event.categoryId);
    this._title = ActivityTitle.fromString(event.title);
    this._description = ActivityDescription.fromString(event.description);
    this._capacity = ActivityCapacity.fromNumber(event.capacity);
    this._contactInfo = ActivityContactInfo.fromString(event.contactInfo);
    this._dateLimit = ActivityDateLimit.fromMillisecondsSinceEpoch(event.dateLimit);
    this._createdAt = ActivityCreatedAt.fromMillisecondsSinceEpoch(event.createdAt);
  }
}
