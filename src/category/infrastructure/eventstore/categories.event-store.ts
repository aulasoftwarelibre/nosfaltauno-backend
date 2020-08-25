import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import { EventStore } from '../../../core/eventstore/eventstore';
import { Category } from '../../domain/model/category';
import { CategoryId } from '../../domain/model/category-id';
import { Categories } from '../../domain/repository/categories';

@Injectable()
export class CategoryEventStore implements Categories {
  constructor(
    private readonly eventStore: EventStore,
    private readonly publisher: EventPublisher,
  ) {}

  async find(categoryId: CategoryId): Promise<Category> | null {
    return this.eventStore.read(Category, categoryId.value);
  }

  save(category: Category): void {
    category = this.publisher.mergeObjectContext(category);
    category.commit();
  }
}
