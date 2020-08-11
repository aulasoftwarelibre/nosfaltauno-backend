import { UserId } from '../model/user-id';
import { User } from '../model/user';

export interface Users {
  find(userId: UserId): Promise<User> | null;
  get(userId: UserId): Promise<User>;
  save(user: User): void;
}

export const USERS = 'USERS';
