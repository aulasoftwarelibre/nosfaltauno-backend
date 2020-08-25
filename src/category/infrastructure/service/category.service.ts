import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import {
  CreateCategoryCommand,
} from '../../application/command/create-category.command';
import {
  CATEGORY_MODEL,
  CategoryView,
} from '../read-model/schema/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(CATEGORY_MODEL) private readonly categoryModel: Model<CategoryView>,
  ) {}

  async createCategory(categoryId: string, title: string): Promise<void> {
    return await this.commandBus.execute(
      new CreateCategoryCommand(categoryId, title),
    );
  }

  async getCategories(): Promise<CategoryView[]> {
    return this.categoryModel.find({});
  }
}
