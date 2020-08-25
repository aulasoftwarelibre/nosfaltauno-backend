import { ValueObject } from '../../../core/domain';

interface Props {
  value: string;
}

export class CategoryTitle extends ValueObject<Props> {
  static fromString(value: string): CategoryTitle {
    if (value.length === 0) {
      throw new Error();
    }

    return new this({ value });
  }

  get value(): string {
    return this.props.value;
  }
}
