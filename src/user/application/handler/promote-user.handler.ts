import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserAlreadyPromotedError } from '../../domain/exception/user-already-promoted';
import { UserIdNotFoundError } from '../../domain/exception/user-id-not-found';
import { User } from '../../domain/model/user';
import { UserId } from '../../domain/model/user-id';
import { USERS, Users } from '../../domain/repository/users';
import { PromoteUserCommand } from '../command/promote-user.command';

@CommandHandler(PromoteUserCommand)
export class PromoteUserHandler implements ICommandHandler<PromoteUserCommand> {
  constructor(@Inject(USERS) private readonly users: Users) {}

  async execute(command: PromoteUserCommand) {
    const userId = UserId.fromString(command.userId);
    const user = await this.users.find(userId);

    if (!(user instanceof User)) {
      throw UserIdNotFoundError.withUserId(userId);
    }

    user.promote();

    await this.users.save(user);
  }
}
