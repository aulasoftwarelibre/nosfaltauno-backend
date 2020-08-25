import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import {
    CreateCategoryCommand,
} from '../../application/command/create-category.command';

@Injectable()
export class CategoryService {
  constructor(private readonly commandBus: CommandBus) {}

  async createCategory(id: string, title: string): Promise<void> {
    this.commandBus.execute(new CreateCategoryCommand(id, title));
  }
}
