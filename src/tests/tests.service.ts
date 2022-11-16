import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class TestsService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async create(data: any) {
    await this.cacheManager.set('test', data);

    return 'This action adds a new test';
  }

  async findOne() {
    return await this.cacheManager.get('test');
  }
}
