import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { generateSlug } from 'src/common/mixins';
import { CreateUserDto } from 'src/auth/dto/create-auth.dto';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/auth/entities/auth.entity';
import { postData } from '../common/data/post.data';
import { userData } from '../common/data/user.data';

@Injectable()
export class SeedService {
  private postData: CreatePostDto[] = postData;
  private userData: CreateUserDto[] = userData;

  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>,

    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async generate() {
    if (process.env.NODE_ENV !== 'production') {
      await this.deleteTables();
      const users = await this.insertUsers();
      await this.insertPosts(users[0]._id);
      return {
        statusCode: 200,
        message: 'Seed executed',
      };
    }
    throw new BadRequestException(
      'Seed can only be run in the development environment',
    );
  }

  private async insertPosts(user: Types.ObjectId) {
    try {
      const postToInsert = [];
      this.postData.forEach((post) => {
        postToInsert.push({ ...post, slug: generateSlug(post.title), user });
      });

      await this.postModel.insertMany(postToInsert);
      return this.postData;
    } catch (error) {
      console.log(error);

      throw new BadRequestException(`Can't generate seed`);
    }
  }

  private async insertUsers() {
    try {
      const userToInsert = [];
      this.userData.forEach((user) => {
        userToInsert.push({ ...user });
      });
      const users = await this.userModel.insertMany(userToInsert);
      return users;
    } catch (error) {
      console.log(error);

      throw new BadRequestException(`Can't generate seed`);
    }
  }

  private async deleteTables() {
    await this.userModel.deleteMany({}); // Delete all users
    await this.postModel.deleteMany({}); // Delete all posts
  }
}
