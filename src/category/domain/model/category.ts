import { AggregateRoot } from '../../../core/domain';
import { CategoryWasCreated } from '../event/category-was-created.event';
import { CategoryId } from './category-id';
import { CategoryTitle } from './category-title';

export class Category extends AggregateRoot {
  private _categoryId: CategoryId;
  private _categoryTitle: CategoryTitle;

  private constructor() {
    super();
  }

  public static add(id: CategoryId, title: CategoryTitle): Category {
    const category = new Category();

    category.apply(new CategoryWasCreated(id.value, title.value));

    return category;
  }

  aggregateId(): string {
    return this._categoryId.value;
  }

  get id(): CategoryId {
    return this._categoryId;
  }

  get title(): CategoryTitle {
    return this._categoryTitle;
  }

  private onCategoryWasCreated(event: CategoryWasCreated) {
    this._categoryId = CategoryId.fromString(event.id);
    this._categoryTitle = CategoryTitle.fromString(event.title);
  }
}
