export class EmptyUseravatarError extends Error {
  public static withString(): EmptyUseravatarError {
    return new EmptyUseravatarError(
      'User Avatar is not valid because it is empty',
    );
  }
}
