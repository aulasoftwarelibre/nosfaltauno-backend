import { CategoryWasCreated } from './category-was-created.event';

export const EventHandlers = {
  CategoryWasCreated: (id: string, title: string): CategoryWasCreated =>
    new CategoryWasCreated(id, title),
};
