import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { User } from 'src/auth/entities/auth.entity';

@Schema()
export class Post extends Document {
  @Prop({
    unique: true,
  })
  title: string;

  @Prop({
    unique: true,
    index: true,
  })
  slug: string;

  @Prop()
  short_description: string;

  @Prop()
  description: string;

  @Prop({
    default: Date.now(),
  })
  created_at: Date;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: User.name,
  })
  user: Types.ObjectId;

  @Prop()
  tags: string[];

  @Prop({
    default: true,
  })
  is_published: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
