import { DomainEvent } from '../../../core/domain';

export class CategoryWasCreated implements DomainEvent {
  public constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly parentId?: string,
  ) {}
}
