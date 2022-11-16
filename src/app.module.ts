import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { TestsModule } from './tests/tests.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_HOST, {
      dbName: process.env.MONGODB_DATABASE,
    }),
    PostsModule,
    TestsModule,
  ],
})
export class AppModule {}
