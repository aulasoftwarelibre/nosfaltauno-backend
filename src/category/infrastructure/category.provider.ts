import { CATEGORIES } from '../domain/repository/categories';
import { CategoryEventStore } from './eventstore/categories.event-store';

export const CategoryProviders = [
  {
    provide: CATEGORIES,
    useClass: CategoryEventStore,
  },
];
