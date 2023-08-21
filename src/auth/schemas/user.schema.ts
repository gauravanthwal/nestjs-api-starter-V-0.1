import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ required: true })
  name: String;

  @Prop({ required: true, unique: true })
  email: String;

  @Prop({ default: false, required: false })
  isEmailVerified?: boolean;

  @Prop({ required: true, select: false })
  password: String;
}

export const UserSchema = SchemaFactory.createForClass(User);
