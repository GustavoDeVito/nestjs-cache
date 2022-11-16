import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { Model, ObjectId } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @Inject(CACHE_MANAGER) protected readonly cacheManager: Cache,
  ) {}

  async cache() {
    return await this.cacheManager.store.keys();
  }

  async create(createPostDto: CreatePostDto) {
    const exist = await this.postModel
      .exists({ title: createPostDto?.title })
      .exec();

    if (exist) {
      throw new BadRequestException('Post already exists');
    }

    const post = new this.postModel(createPostDto);

    await this.cacheManager.store.del('posts-findAll');

    return post.save();
  }

  findAll(): Promise<Post[]> {
    console.log('DB');
    return this.postModel.find().sort({ title: 1 }).exec();
  }

  async findOne(id: ObjectId): Promise<Post> {
    const post = await this.postModel.findById(id).exec();

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const exist = await this.postModel.findById(id).exec();

    if (!exist) {
      throw new NotFoundException('Post not found');
    }

    await this.cacheManager.store.del('posts-findAll');

    return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
  }

  async delete(id: string) {
    const exist = await this.postModel.findById(id).exec();

    if (!exist) {
      throw new NotFoundException('Post not found');
    }

    await this.cacheManager.store.del('posts-findAll');

    return this.postModel.findByIdAndUpdate(
      id,
      { status: false },
      { new: true },
    );
  }
}
