import { ICommand } from '@nestjs/cqrs';

export class CreateCategoryCommand implements ICommand {
  constructor(
    public readonly categoryId: string,
    public readonly categoryTitle: string,
  ) {}
}
