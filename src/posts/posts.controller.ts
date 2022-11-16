import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ParseMongoIdPipe } from '../common/pipe/parse-mongo-id/parse-mongo-id.pipe';
import { SearchPostDto } from './dto/search-post.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { UserRolesEnum } from 'src/auth/interfaces/user-roles.interface';
import { User } from 'src/auth/entities/auth.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Auth(UserRolesEnum.ADMIN)
  create(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postsService.create(createPostDto, user);
  }

  @Get()
  findAll(@Query() searchPostDto: SearchPostDto) {
    return this.postsService.findAll(searchPostDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @Auth(UserRolesEnum.ADMIN)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @Auth(UserRolesEnum.ADMIN)
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.postsService.remove(id);
  }
}
