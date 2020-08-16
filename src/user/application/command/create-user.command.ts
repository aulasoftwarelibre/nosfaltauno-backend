import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly userName: string,
    public readonly userEmail: string,
    public readonly userAvatar: string,
  ) {}
}
