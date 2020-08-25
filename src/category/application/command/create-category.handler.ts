import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Category } from '../../domain/model/category';
import { CategoryId } from '../../domain/model/category-id';
import { CategoryTitle } from '../../domain/model/category-title';
import { CATEGORIES, Categories } from '../../domain/repository/categories';
import { CreateCategoryCommand } from './create-category.command';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler
  implements ICommandHandler<CreateCategoryCommand> {
  constructor(@Inject(CATEGORIES) private readonly categories: Categories) {}

  async execute(command: CreateCategoryCommand): Promise<void> {
    const categoryId = CategoryId.fromString(command.categoryId);
    const categoryTitle = CategoryTitle.fromString(command.categoryTitle);

    if ((await this.categories.find(categoryId)) instanceof Category) {
      throw Error('Duplicate id');
    }

    const category = Category.add(categoryId, categoryTitle);

    this.categories.save(category);
  }
}
