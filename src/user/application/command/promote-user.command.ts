import { ICommand } from '@nestjs/cqrs';

export class PromoteUserCommand implements ICommand {
  constructor(public readonly userId: string) {}
}
