import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Role {
  @Prop({
    type: String,
    enum: ['admin', 'moderator', 'user'],
    required: true,
  })
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
