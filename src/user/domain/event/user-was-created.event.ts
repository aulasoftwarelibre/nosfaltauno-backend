import { DomainEvent } from 'src/core/domain';

export class UserWasCreated implements DomainEvent {
  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly avatar: string,
  ) {}
}
