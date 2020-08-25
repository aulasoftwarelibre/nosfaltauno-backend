import { Id } from '../../../core/domain';

export class UserId extends Id {
  public static fromString(id: string): UserId {
    return new UserId(id);
  }
}
