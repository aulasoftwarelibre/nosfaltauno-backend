import { Id } from '../../../core/domain';

export class CategoryId extends Id {
  public static fromString(id: string): CategoryId {
    return new CategoryId(id);
  }
}
