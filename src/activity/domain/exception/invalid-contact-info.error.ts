export class InvalidContactInfoError extends Error {
  public static withString(): InvalidContactInfoError {
    return new InvalidContactInfoError(`Contact info should have 9 or more characters`);
  }
}
