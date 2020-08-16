import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserId } from '../../../user/domain/model/user-id';
import { UserName } from '../../../user/domain/model/user-name';
import { USERS, Users } from '../../../user/domain/repository/users';
import { CreateUserCommand } from '../command/create-user.command';

import { Inject } from '@nestjs/common';
import { User } from '../../../user/domain/model/user';
import { UserIdAlreadyRegisteredError } from '../../../user/domain/exception/user-id-already-registered.error';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(@Inject(USERS) private readonly users: Users) {}

  async execute(command: CreateUserCommand) {
    const userId = UserId.fromString(command.userId);
    const userName = UserName.fromString(command.userName);
    const userEmail = UserId.fromString(command.userEmail);
    const userAvatar = UserId.fromString(command.userAvatar);

    if ((await this.users.find(userId)) instanceof User) {
      throw UserIdAlreadyRegisteredError.withString(command.userId);
    }

    const user = User.add(userId, userName, userEmail, userAvatar);

    this.users.save(user);
  }
}
