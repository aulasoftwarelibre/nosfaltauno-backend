import { UserWasCreated } from './user-was-created.event';
import { UserWasPromoted } from './user-was-promoted.event';

export { UserWasCreated };
export { UserWasPromoted };

export const userEventHandlers = {
  UserWasCreated: (
    id: string,
    name: string,
    email: string,
    avatar: string,
    isAdmin: Boolean,
  ) => new UserWasCreated(id, name, email, avatar, isAdmin),
  UserWasPromoted: (id: string) => new UserWasPromoted(id),
};
