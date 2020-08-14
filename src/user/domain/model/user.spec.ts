import { CqrsModule, EventBus, EventPublisher } from '@nestjs/cqrs';
import { User } from './user';
import { v4 as uuid } from 'uuid';
import { UserId } from './user-id';
import { UserName } from './user-name';
import { UserEmail } from './user-email';
import { UserAvatar } from './user-avatar';
import { Test, TestingModule } from '@nestjs/testing';
import { UserWasCreated } from '../event/user-was-created.event';
import { UserWasPromoted } from '../event';

describe('User', () => {
  let user: User;
  let eventBus$: EventBus;
  let eventPublisher$: EventPublisher;

  const userId = UserId.fromString(uuid());
  const userName = UserName.fromString('test');
  const userEmail = UserEmail.fromString('test@test.com');
  const userAvatar = UserAvatar.fromString('avatar.com');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
    }).compile();

    eventBus$ = module.get<EventBus>(EventBus);
    eventBus$.publish = jest.fn();
    eventPublisher$ = module.get<EventPublisher>(EventPublisher);
  });

  it('can be created', () => {
    user = eventPublisher$.mergeObjectContext(
      User.add(userId, userName, userEmail, userAvatar),
    );
    user.commit();

    expect(eventBus$.publish).toHaveBeenCalledTimes(1);
    expect(eventBus$.publish).toHaveBeenCalledWith(
      new UserWasCreated(
        userId.value,
        userName.value,
        userEmail.value,
        userAvatar.value,
      ),
    );
  });

  it('has an id', () => {
    expect(user.id.equals(userId)).toBeTruthy();
  });

  it('has an name', () => {
    expect(user.name.equals(userName)).toBeTruthy();
  });

  it('has an email', () => {
    expect(user.email.equals(userEmail)).toBeTruthy();
  });

  it('has an avatar', () => {
    expect(user.avatar.equals(userAvatar)).toBeTruthy();
  });

  it('is not admin by default', () => {
    expect(user.admin.value).toBe(false);
  });

  it('can be promoted', () => {
    user = eventPublisher$.mergeObjectContext(user);
    user.promote();
    user.commit();

    expect(eventBus$.publish).toHaveBeenCalledTimes(1);
    expect(eventBus$.publish).toHaveBeenCalledWith(
      new UserWasPromoted(userId.value),
    );

    expect(user.admin).toBeTruthy();
  });
});
