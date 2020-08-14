import { CreateUserHandler } from './create-user.handler';
import { USERS, Users } from '../../domain/repository/users';

import { v4 as uuid } from 'uuid';
import { UserId } from '../../../user/domain/model/user-id';
import { UserName } from '../../../user/domain/model/user-name';
import { UserEmail } from '../../../user/domain/model/user-email';
import { UserAvatar } from '../../../user/domain/model/user-avatar';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserCommand } from '../command/create-user.command';
import { User } from '../../../user/domain/model/user';
import { UserIdAlreadyRegisteredError } from '../../../user/domain/exception/user-id-already-registered.error';

describe('CreateUserHandler', () => {
  let command$: CreateUserHandler;

  const users: Partial<Users> = {};

  const userId = UserId.fromString(uuid());
  const userName = UserName.fromString('test');
  const userEmail = UserEmail.fromString('test@test.com');
  const userAvatar = UserAvatar.fromString('avatar.com');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserHandler,
        {
          provide: USERS,
          useValue: users,
        },
      ],
    }).compile();

    command$ = module.get<CreateUserHandler>(CreateUserHandler);
    users.save = jest.fn();
  });

  it('should creates a new user', async () => {
    users.find = jest.fn().mockResolvedValue(null);

    await command$.execute(
      new CreateUserCommand(
        userId.value,
        userName.value,
        userEmail.value,
        userAvatar.value,
      ),
    );

    expect(users.save).toHaveBeenCalledTimes(1);

    expect(users.save).toHaveBeenCalledWith(
      User.add(userId, userName, userEmail, userAvatar),
    );
  });

  it('should not create a user if it is in database', async () => {
    const user = User.add(userId, userName, userEmail, userAvatar);
    users.find = jest.fn().mockResolvedValue(user);

    expect(
      command$.execute(
        new CreateUserCommand(
          userId.value,
          userName.value,
          userEmail.value,
          userAvatar.value,
        ),
      ),
    ).rejects.toThrow(UserIdAlreadyRegisteredError);

    expect(users.save).toHaveBeenCalledTimes(0);
  });
});
