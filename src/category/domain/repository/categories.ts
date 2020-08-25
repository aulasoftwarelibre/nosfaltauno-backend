import { Category } from '../model/category';
import { CategoryId } from '../model/category-id';

export interface Categories {
  find(categoryId: CategoryId): Promise<Category> | null;
  save(category: Category): void;
}

export const CATEGORIES = 'CATEGORIES';
