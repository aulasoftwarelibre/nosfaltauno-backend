import { ValueObject } from '../../../core/domain';

interface Props {
  value: string;
}

export class ActivityDescription extends ValueObject<Props> {
  public static fromString(description: string): ActivityDescription {
    return new this({ value: description });
  }

  get value(): string {
    return this.props.value;
  }
}
