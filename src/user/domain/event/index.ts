import { UserWasCreated } from './user-was-created.event';

export { UserWasCreated };

export const userEventHandlers = {
  UserWasCreated: (id: string, name: string, email: string, avatar: string) =>
    new UserWasCreated(id, name, email, avatar),
};
