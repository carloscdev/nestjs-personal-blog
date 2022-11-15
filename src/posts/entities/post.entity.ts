import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
    default: '@carloscdev',
  })
  author: string;

  @Prop()
  tags: string[];

  @Prop({
    default: true,
  })
  is_published: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
