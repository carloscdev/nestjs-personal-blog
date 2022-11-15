import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generateSlug } from 'src/common/mixins';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { Post } from 'src/posts/entities/post.entity';
import { postData } from '../common/data/post.data';

@Injectable()
export class SeedService {
  private postData: CreatePostDto[] = postData;

  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>,
  ) {}

  async generate() {
    try {
      await this.postModel.deleteMany({}); // Delete all posts
      const postToInsert = [];
      this.postData.forEach((post) => {
        postToInsert.push({ ...post, slug: generateSlug(post.title) });
      });
      await this.postModel.insertMany(postToInsert);
      return this.postData;
    } catch (error) {
      console.log(error);

      throw new BadRequestException(`Can't generate seed`);
    }
  }
}
