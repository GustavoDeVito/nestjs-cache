import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class TestsService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async create() {
    await this.cacheManager.set('test', 'Testing', { ttl: 3000 });

    return 'This action adds a new test';
  }

  async findOne() {
    const cache = await this.cacheManager.get('test');

    return {
      cache,
    };
  }
}
