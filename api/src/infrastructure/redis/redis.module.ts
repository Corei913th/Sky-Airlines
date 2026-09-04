import { Global, Module } from '@nestjs/common';
import { Redis, type RedisOptions } from 'ioredis';
import { RedisService } from './redis.service';
import { AbstractRedisService } from './abstracts/redis-service';
import { REDIS_CLIENT } from './constants';
import { ENV } from '@/config/env';

/**
 * Global infrastructure module providing Redis caching and storage services across the application.
 */
@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: (): Redis => {
        const options: RedisOptions = {
          host: ENV.REDIS_HOST,
          port: ENV.REDIS_PORT,
          password: ENV.REDIS_PASSWORD ?? undefined,
          db: ENV.REDIS_DB,
          keyPrefix: ENV.REDIS_KEY_PREFIX,
          lazyConnect: true,
          maxRetriesPerRequest: 3,
          retryStrategy: (times: number): number => Math.min(times * 100, 2000), // Exponential backoff with a max of 2 seconds
        };
        return new Redis(options);
      },
    },
    {
      provide: AbstractRedisService,
      useClass: RedisService,
    },
  ],
  exports: [AbstractRedisService, REDIS_CLIENT],
})
export class RedisModule {}
