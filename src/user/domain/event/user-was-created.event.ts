import { DomainEvent } from 'src/core/domain';

export class UserWasCreated implements DomainEvent {
  public constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly useremail: string,
    public readonly useravatar: string,
  ) {}
}
