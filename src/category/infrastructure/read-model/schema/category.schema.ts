import { Document, Schema } from 'mongoose';

export const CategorySchema = new Schema({
  _id: String,
  title: String,
  __v: { type: Number, select: false },
});

export interface CategoryView extends Document {
  readonly _id: string;
  readonly title: string;
}

export const CATEGORY_MODEL = 'CATEGORY_MODEL';
