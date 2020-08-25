import { ICommand } from '@nestjs/cqrs';

export class RemoveSubscriptionCommand implements ICommand{
    constructor(
        public readonly subscriptionId: string
    ) {}
}
