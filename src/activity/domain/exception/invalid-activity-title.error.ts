export class InvalidActivityTitle extends Error {
  public static withString(): InvalidActivityTitle {
    return new InvalidActivityTitle('The activity title must have 3 or more characters');
  }
}
