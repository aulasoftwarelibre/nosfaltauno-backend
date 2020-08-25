import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CategoryId } from '../../../category/domain/model/category-id';
import { UserId } from '../../../user/domain/model/user-id';
import { Subscription } from '../../domain/model/subscription';
import { SubscriptionId } from '../../domain/model/subscription-id';
import {
    Subscriptions,
    SUBSCRIPTIONS,
} from '../../domain/repository/subscriptions';
import {
    CreateSubscriptionCommand,
} from '../command/create-subscription.command';

@CommandHandler(CreateSubscriptionCommand)
export class CreateSubscriptionHandler implements ICommandHandler<CreateSubscriptionCommand> {
    constructor (@Inject(SUBSCRIPTIONS) private readonly subscriptions: Subscriptions){} 
    
    async execute(command: CreateSubscriptionCommand): Promise<void> {
        const subscriptionId = SubscriptionId.fromString(command.subscriptionId);
        const categoryId = CategoryId.fromString(command.categoryId);
        const userId = UserId.fromString(command.userId);

        if (await this.subscriptions.find(subscriptionId) instanceof Subscription){
            throw Error('Duplicate Subscription Id');
        }

        const subscription = Subscription.add(subscriptionId, categoryId, userId);

        this.subscriptions.save(subscription)
    }    

}
