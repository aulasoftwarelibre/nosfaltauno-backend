import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Subscription } from '../../domain/model/subscription';
import { SubscriptionId } from '../../domain/model/subscription-id';
import {
    SUBSCRIPTIONS,
    Subscriptions,
} from '../../domain/repository/subscriptions';
import {
    RemoveSubscriptionCommand,
} from '../command/remove-subscription.command';

@CommandHandler(RemoveSubscriptionCommand)
export class RemoveSubscriptionHandler implements ICommandHandler<RemoveSubscriptionCommand> {
    constructor(@Inject(SUBSCRIPTIONS) private readonly subscriptions: Subscriptions) {}

    async execute(command: RemoveSubscriptionCommand): Promise<void> {
        const subscriptionId = SubscriptionId.fromString(command.subscriptionId);
        const subscription = await this.subscriptions.find(subscriptionId);
        if(!(subscription instanceof Subscription)) {
            throw Error('Invalid Id');
        }

        subscription.delete();

        this.subscriptions.save(subscription);
    }
}

