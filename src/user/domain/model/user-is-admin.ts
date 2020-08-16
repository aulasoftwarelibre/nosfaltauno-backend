import { ValueObject } from '../../../core/domain/models/value-object';

interface Props {
  value: Boolean;
}

export class UserIsAdmin extends ValueObject<Props> {
  public static fromBoolean(value: Boolean): UserIsAdmin {
    return new this({ value });
  }

  get value(): Boolean {
    return this.props.value;
  }
}
