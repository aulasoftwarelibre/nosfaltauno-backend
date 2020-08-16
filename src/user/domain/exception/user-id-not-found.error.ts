import { UserId } from '../model/user-id';

export class UserIdNotFoundError extends Error {
  public static withUserId(userId: UserId): UserIdNotFoundError {
    return new UserIdNotFoundError(`UserId ${userId.value} not found.`);
  }
}
