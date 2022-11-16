import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  username: string;

  @Prop({
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    default: true,
  })
  is_active: boolean;

  @Prop({
    default: ['ADMIN'],
  })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
