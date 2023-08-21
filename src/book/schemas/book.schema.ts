import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export enum Category {
  ADVENTURE = 'ADVENTURE',
  CLASSIC = 'CLASSIC',
  CRIME = 'CRIME',
  FANTASY = 'FANTASY',
}

@Schema({
  timestamps: true,
  validateBeforeSave: true,
  validateModifiedOnly: true,
})
export class Book {
  @Prop({ required: [true, 'Title is required'], unique: false })
  title: String;

  @Prop({ required: true })
  description: String;

  @Prop()
  author: String;

  @Prop({ required: true })
  price: Number;

  @Prop()
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);
