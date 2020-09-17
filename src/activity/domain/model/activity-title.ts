import { ValueObject } from '../../../core/domain';
import { InvalidActivityTitle } from '../exception/invalid-activity-title.error';

interface Props {
  value: string;
}

export class ActivityTitle extends ValueObject<Props> {
  public static fromString(title: string): ActivityTitle {
    if (title.length <= 3) {
      throw InvalidActivityTitle.withString();
    }
    return new this({ value: title });
  }

  get value(): string {
    return this.props.value;
  }
}
