import { Connection, Model } from 'mongoose';

import { USERS } from '../domain/repository/users';
import { UserEventStore } from './eventstore/user.event-store';
import {
  USER_MODEL,
  UserSchema,
  UserView,
} from './read-model/schema/user.schema';

export const UserProviders = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection): Model<UserView> =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: USERS,
    useClass: UserEventStore,
  },
];
