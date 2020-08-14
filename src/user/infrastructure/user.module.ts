import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from 'src/core/database';
import { EventStore, EventStoreModule } from 'src/core/eventstore';
import { CommandHandlers } from '../application/handler';
import { userEventHandlers } from '../domain/event';

@Module({
  imports: [CqrsModule, DatabaseModule, EventStoreModule.forRoot()],
  providers: [...CommandHandlers],
})
export class UserModule implements OnModuleInit {
  constructor(private readonly eventStore: EventStore) {}

  onModuleInit() {
    this.eventStore.addEventHandlers(userEventHandlers);
  }
}
