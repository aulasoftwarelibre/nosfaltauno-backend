import { ValueObject } from '../../../core/domain';

interface Props {
  value: number;
}

export class ActivityCreatedAt extends ValueObject<Props> {
  public static fromMillisecondsSinceEpoch(millisecondsSinceEpoch: number): ActivityCreatedAt {
    return new this({ value: millisecondsSinceEpoch });
  }

  get value(): number {
    return this.props.value;
  }
}
