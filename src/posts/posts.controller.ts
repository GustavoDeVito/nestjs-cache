import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ParseObjectIdPipe } from './pipes/objectId.pipe';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ObjectId } from 'mongoose';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createUserDto: CreatePostDto) {
    return this.postsService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateUserDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updateUserDto);
  }

  @Put()
  status(
    @Query('id', ParseObjectIdPipe) id: string,
    @Query('status') status: string,
  ) {
    return this.postsService.status(id, status);
  }
}