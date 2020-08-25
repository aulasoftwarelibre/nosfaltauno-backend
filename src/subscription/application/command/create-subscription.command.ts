import { ICommand } from '@nestjs/cqrs';

export class CreateSubscriptionCommand implements ICommand {
    constructor(
        public readonly subscriptionId: string,
        public readonly categoryId: string,
        public readonly userId: string
    ) { }
}
