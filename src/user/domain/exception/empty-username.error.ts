export class EmptyUsernameError extends Error {
  public static withString(): EmptyUsernameError {
    return new EmptyUsernameError(
      'User Name is not valid because it is empty',
    );
  }
}