import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';
import { UserWasPromoted } from 'src/user/domain/event';

import { UserView } from '../schema/user.schema';

@EventsHandler(UserWasPromoted)
export class UserWasPromotedProjection
  implements IEventHandler<UserWasPromoted> {
  constructor(
    @Inject('USER_MODEL') private readonly userModel: Model<UserView>,
  ) {}

  async handle(event: UserWasPromoted): Promise<void> {
    this.userModel.updateOne({ _id: event.id }, { isAdmin: true }).exec();
  }
}
