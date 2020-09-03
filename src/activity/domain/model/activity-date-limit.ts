import { ValueObject } from '../../../core/domain';

interface Props {
  value: number;
}

export class ActivityDateLimit extends ValueObject<Props> {
  public static fromMillisecondsSinceEpoch(millisecondsSinceEpoch: number): ActivityDateLimit {
    return new this({ value: millisecondsSinceEpoch });
  }

  get value(): number {
    return this.props.value;
  }
}
