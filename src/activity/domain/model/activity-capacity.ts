import { ValueObject } from '../../../core/domain';
import { InvalidActivityCapacityError } from '../exception/invalid-activity-capacity.error';

interface Props {
  value: number;
}

export class ActivityCapacity extends ValueObject<Props> {
  public static fromNumber(capacity: number): ActivityCapacity {
    if (capacity < 2) {
      throw InvalidActivityCapacityError.withString()
    }

    return new this({ value: capacity });
  }

  get value(): number {
    return this.props.value;
  }
}
