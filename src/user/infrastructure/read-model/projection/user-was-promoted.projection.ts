import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Model } from 'mongoose';

import { UserView } from '../schema/user.schema';
import { UserWasPromoted } from 'src/user/domain/event';

@EventsHandler(UserWasPromoted)
export class UserWasPromotedProjection
  implements IEventHandler<UserWasPromoted> {
  constructor(
    @Inject('USER_MODEL') private readonly userModel: Model<UserView>,
  ) {}

  async handle(event: UserWasPromoted) {
    this.userModel.updateOne({ _id: event.id }, { isAdmin: true }).exec();
  }
}
