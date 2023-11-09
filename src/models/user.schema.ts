import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RoleSchema, Role } from './role.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: RoleSchema, default: { name: 'user' } }) // Establece una referencia al esquema de Role
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
