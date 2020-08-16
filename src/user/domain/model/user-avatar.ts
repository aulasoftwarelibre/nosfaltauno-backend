
import { ValueObject } from '../../../core/domain';
import { EmptyUseravatarError } from '../exception/empty-useravatar.error';

interface Props{
  value: string;
}

export class UserAvatar extends ValueObject<Props> {
  static fromString(value: string): UserAvatar {
    if (value.length === 0) {
      throw new EmptyUseravatarError();
    }

    return new this({ value });
  }

  get value(): string{
    return this.props.value;
  }
}