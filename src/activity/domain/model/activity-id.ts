import { Id } from '../../../core/domain';

export class ActivityId extends Id {
  public static fromString(id: string): ActivityId {
    return new ActivityId(id);
  }
}
