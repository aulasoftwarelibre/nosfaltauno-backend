import { AggregateRoot } from '../../../core/domain/models/aggregate-root';
import { UserWasPromoted } from '../event';
import { UserWasCreated } from '../event/user-was-created.event';
import { UserAvatar } from './user-avatar';
import { UserEmail } from './user-email';
import { UserId } from './user-id';
import { UserIsAdmin } from './user-is-admin';
import { UserName } from './user-name';

export class User extends AggregateRoot {
  private _userId: UserId;
  private _userName: UserName;
  private _userEmail: UserEmail;
  private _userAvatar: UserAvatar;
  private _userIsAdmin: UserIsAdmin;

  private constructor() {
    super();
  }

  public static add(
    id: UserId,
    name: UserName,
    email: UserEmail,
    avatar: UserAvatar,
  ): User {
    const user = new User();

    user.apply(
      new UserWasCreated(id.value, name.value, email.value, avatar.value),
    );

    return user;
  }

  promote() {
    this.apply(new UserWasPromoted(this._userId.value));
  }

  aggregateId(): string {
    return this._userId.value;
  }

  get id(): UserId {
    return this._userId;
  }

  get name(): UserName {
    return this._userName;
  }

  get email(): UserEmail {
    return this._userEmail;
  }

  get avatar(): UserAvatar {
    return this._userAvatar;
  }

  get admin(): UserIsAdmin {
    return this._userIsAdmin;
  }

  private onUserWasCreated(event: UserWasCreated) {
    this._userId = UserId.fromString(event.id);
    this._userName = UserName.fromString(event.name);
    this._userEmail = UserEmail.fromString(event.email);
    this._userAvatar = UserAvatar.fromString(event.avatar);
    this._userIsAdmin = UserIsAdmin.fromBoolean(false);
  }

  private onUserWasPromoted(event: UserWasPromoted) {
    this._userIsAdmin = UserIsAdmin.fromBoolean(true);
  }
}
