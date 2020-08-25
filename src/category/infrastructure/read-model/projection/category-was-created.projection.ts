import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import {
  CategoryWasCreated,
} from '../../../domain/event/category-was-created.event';
import { CategoryView } from '../schema/category.schema';

@EventsHandler(CategoryWasCreated)
export class CategoryWasCreatedProjection
  implements IEventHandler<CategoryWasCreated> {
  constructor(
    @Inject('CATEGORY_MODEL')
    private readonly categoryModel: Model<CategoryView>,
  ) {}

  async handle(event: CategoryWasCreated): Promise<void> {
    const categoryView = new this.categoryModel({
      _id: event.id,
      title: event.title,
    });

    categoryView.save();
  }
}
