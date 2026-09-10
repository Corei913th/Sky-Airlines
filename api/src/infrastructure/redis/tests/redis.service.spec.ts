import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import RedisMock from 'ioredis-mock';
import { RedisService } from '../redis.service';
import { AbstractRedisService } from '../abstracts/redis-service';
import { REDIS_CLIENT } from '../constants';
import { LoggerService } from '@/infrastructure/logger/logger';

describe('RedisService', () => {
  let service: RedisService;
  let redisMockClient: InstanceType<typeof RedisMock>;

  beforeEach(async () => {
    redisMockClient = new RedisMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        {
          provide: REDIS_CLIENT,
          useValue: redisMockClient,
        },
        {
          provide: AbstractRedisService,
          useValue: redisMockClient,
        },
        {
          provide: LoggerService,
          useValue: {
            info: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RedisService>(RedisService);
    await service.onModuleInit();
  });

  afterEach(async () => {
    if (service) {
      await service.onModuleDestroy();
    }
  });

  it('should set and get values from Redis', async () => {
    await service.set('test_key', 'test_value');
    const result = await service.get('test_key');
    expect(result).toBe('test_value');
  });

  it('should return null for non-existing keys', async () => {
    const result = await service.get('non_existent_key');
    expect(result).toBeNull();
  });

  it('should check if key exists', async () => {
    await service.set('exists_key', 'value');
    const exists = await service.exists('exists_key');
    expect(exists).toBe(true);

    const notExists = await service.exists('random_key');
    expect(notExists).toBe(false);
  });

  it('should delete keys from Redis', async () => {
    await service.set('delete_key', 'value');
    const deletedCount = await service.del('delete_key');
    expect(deletedCount).toBe(1);

    const result = await service.get('delete_key');
    expect(result).toBeNull();
  });
});
