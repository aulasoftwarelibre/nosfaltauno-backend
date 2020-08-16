import { v4 as uuid } from 'uuid';

import { USERS, Users } from '../../domain/repository/users';
import { PromoteUserCommand } from '../command/promote-user.command';
import { PromoteUserHandler } from './promote-user.handler';
import { UserId } from '../../../user/domain/model/user-id';
import { UserName } from '../../../user/domain/model/user-name';
import { UserEmail } from '../../../user/domain/model/user-email';
import { UserAvatar } from '../../../user/domain/model/user-avatar';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../domain/model/user';

describe('Promote user', () => {
  let command$: PromoteUserHandler;

  const users: Partial<Users> = {};

  const userId = UserId.fromString(uuid());
  const userName = UserName.fromString('test');
  const userEmail = UserEmail.fromString('test@test.com');
  const userAvatar = UserAvatar.fromString('avatar.com');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromoteUserHandler,
        {
          provide: USERS,
          useValue: users,
        },
      ],
    }).compile();

    command$ = module.get<PromoteUserHandler>(PromoteUserHandler);
    users.find = jest.fn().mockResolvedValue(null);
    users.save = jest.fn();
  });

  it('should promote user', async () => {
    const user = User.add(userId, userName, userEmail, userAvatar);

    expect(user.admin.value).toBe(false);

    users.find = jest.fn().mockResolvedValue(user);

    user.promote();

    await command$.execute(new PromoteUserCommand(userId.value));

    expect(users.save).toHaveBeenCalledTimes(1);
    expect(users.save).toHaveBeenCalledWith(user);

    expect(user.admin.value).toBe(true);
  });
});
