import { UserId } from '../model/user-id';

export class UserAlreadyPromotedError extends Error {
  public static withUserId(userId: UserId): UserAlreadyPromotedError {
    return new UserAlreadyPromotedError(
      `UserId ${userId.value} already promoted.`,
    );
  }
}
