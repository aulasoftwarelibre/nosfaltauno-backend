import { DomainEvent } from '../../../core/domain';

export class ActivityWasCreated implements DomainEvent {
  constructor(
    public readonly id: string,
    public readonly creatorId: string,
    public readonly categoryId: string,
    public readonly title: string,
    public readonly description: string,
    public readonly capacity: number,
    public readonly contactInfo: string,
    public readonly dateLimit: number,
    public readonly createdAt: number,
  ) {}
}
