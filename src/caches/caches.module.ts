import type { ClientOpts } from 'redis';
import { CacheModule, Module } from '@nestjs/common';
import { CachesService } from './caches.service';
import { CachesController } from './caches.controller';
import { ConfigModule } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register<ClientOpts>({
      isGlobal: true,
      store: redisStore,
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
      ttl: 5, // seconds
    }),
  ],
  controllers: [CachesController],
  providers: [CachesService],
})
export class CachesModule {}
