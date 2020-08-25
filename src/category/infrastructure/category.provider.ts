import { Connection, Model } from 'mongoose';

import { CATEGORIES } from '../domain/repository/categories';
import { CategoryEventStore } from './eventstore/categories.event-store';
import {
  CATEGORY_MODEL,
  CategorySchema,
  CategoryView,
} from './read-model/schema/category.schema';

export const CategoryProviders = [
  {
    provide: CATEGORIES,
    useClass: CategoryEventStore,
  },
  {
    provide: CATEGORY_MODEL,
    useFactory: (connection: Connection): Model<CategoryView> =>
      connection.model('Category', CategorySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
