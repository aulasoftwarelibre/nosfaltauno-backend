import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from '../../core/database';
import { EventStore, EventStoreModule } from '../../core/eventstore';
import { CommandHandlers } from '../application/command';
import { EventHandlers } from '../domain/event';
import { CategoryProviders } from './category.provider';
import { CategoryController } from './controller/category.controller';
import { ProjectionHandlers } from './read-model/projection';
import { CategoryService } from './service/category.service';

@Module({
  controllers: [CategoryController],
  imports: [CqrsModule, DatabaseModule, EventStoreModule.forRoot()],
  providers: [...CategoryProviders, ...CommandHandlers, ...ProjectionHandlers, CategoryService],
})
export class CategoryModule implements OnModuleInit {
  constructor(private readonly eventStore: EventStore) {}

  onModuleInit(): void {
    this.eventStore.addEventHandlers(EventHandlers);
  }
}
