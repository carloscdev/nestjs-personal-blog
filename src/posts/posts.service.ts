import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { generateSlug } from '../common/mixins';
import { CreatePostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const post = await this.postModel.create({
        ...createPostDto,
        slug: generateSlug(createPostDto.title),
      });
      return post;
    } catch (error) {
      this.handleValidationError(error);
    }
  }

  async findAll(searchPostDto: SearchPostDto) {
    const { limit = 10, offset = 0, search = '' } = searchPostDto;
    const regex = new RegExp(search, 'i');
    const posts = await this.postModel
      .find({ title: { $regex: regex } })
      .limit(limit)
      .skip(offset)
      .select('-__v')
      .sort('created_at');
    return posts;
  }

  async findOne(id: string) {
    let post: Post;
    if (isValidObjectId(id)) {
      post = await this.postModel.findById(id);
    }
    if (!post && !isValidObjectId(id)) {
      post = await this.postModel.findOne({ slug: id });
    }
    if (!post) {
      throw new NotFoundException(`Post with slug or id ${id} not found`);
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);

    if (updatePostDto.title) post.slug = generateSlug(updatePostDto.title);

    try {
      await post.updateOne(updatePostDto, { new: true });
      return { ...post.toJSON(), ...updatePostDto };
    } catch (error) {
      this.handleValidationError(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.postModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new NotFoundException(`Post with id ${id} not found`);
    return {
      statusCode: 200,
      message: 'Was deleted successfully',
    };
  }

  handleValidationError(error: any) {
    if (error?.code === 11000)
      throw new BadRequestException(
        `This title was created: ${JSON.stringify(error.keyValue)}`,
      );

    console.log(error);
    throw new InternalServerErrorException('Please, check server logs');
  }
}
