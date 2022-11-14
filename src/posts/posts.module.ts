import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Post, PostSchema } from './schemas/post.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature(
      [{ name: Post.name, schema: PostSchema }],
      'posts',
    ),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
