import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from 'src/core/database';
import { EventStore, EventStoreModule } from 'src/core/eventstore';
import { CommandHandlers } from '../application/handler';
import { userEventHandlers } from '../domain/event';
import { UserController } from './controller/user.controller';
import { UserEventStore } from './eventstore/user.event-store';
import { ProjectionHandlers } from './read-model/projection';
import { UserService } from './service/user.service';
import { UserProviders } from './user.provider';

@Module({
  controllers: [UserController],
  imports: [CqrsModule, DatabaseModule, EventStoreModule.forRoot()],
  providers: [
    ...CommandHandlers,
    ...ProjectionHandlers,
    ...UserProviders,
    UserService,
    UserEventStore,
  ],
})
export class UserModule implements OnModuleInit {
  constructor(private readonly eventStore: EventStore) {}

  onModuleInit() {
    this.eventStore.addEventHandlers(userEventHandlers);
  }
}
