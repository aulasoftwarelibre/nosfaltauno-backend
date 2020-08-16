import { DomainEvent } from 'src/core/domain';

export class UserWasPromoted implements DomainEvent {
  public constructor(public readonly id: string) {}
}
