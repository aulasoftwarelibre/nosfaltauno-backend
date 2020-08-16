import { Document, Schema } from 'mongoose';

export const UserSchema = new Schema({
  _id: String,
  name: String,
  email: String,
  avatar: String,
  isAdmin: String,
  __v: { type: Number, select: false },
});

export interface UserView extends Document {
  readonly _id: string;
  readonly name: string;
  readonly email: string;
  readonly avatar: string;
  readonly isAdmin: Boolean;
}

export const USER_MODEL = 'USER_MODEL';
