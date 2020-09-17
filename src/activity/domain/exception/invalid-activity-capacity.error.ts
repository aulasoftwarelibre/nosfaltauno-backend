export class InvalidActivityCapacityError extends Error {
  public static withString(): InvalidActivityCapacityError {
    return new InvalidActivityCapacityError('An activity must have a capacity of 2 or more members');
  }
}
