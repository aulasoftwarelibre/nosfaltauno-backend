import { ValueObject } from '../../../core/domain';
import { InvalidContactInfoError } from '../exception/invalid-contact-info.error';

interface Props {
  value: string;
}

export class ActivityContactInfo extends ValueObject<Props> {
  public static fromString(contactInfo: string): ActivityContactInfo {
    if (contactInfo.length <= 9) {
      throw InvalidContactInfoError.withString();
    }
    return new this({ value: contactInfo });
  }

  get value(): string {
    return this.props.value;
  }
}
