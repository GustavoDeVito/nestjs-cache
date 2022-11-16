import type { ClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register<ClientOpts>({
      store: redisStore,
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    }),
  ],
  controllers: [TestsController],
  providers: [TestsService],
})
export class TestsModule {}
