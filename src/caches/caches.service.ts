import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CachesService {
  constructor(@Inject(CACHE_MANAGER) protected readonly cacheManager: Cache) {}

  async keys() {
    return await this.cacheManager.store.keys();
  }

  async get(key: string) {
    return {
      key,
      ttl: await this.cacheManager.store.ttl(key),
      data: await this.cacheManager.store.get(key),
    };
  }
}
