import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { AbstractRedisService } from './abstracts/redis-service';
import { REDIS_CLIENT } from './constants';
import { LoggerService as Logger } from '@/infrastructure/logger/logger';

/**
 * Concrete implementation of the AbstractRedisService port wrapping ioredis client.
 */
@Injectable()
export class RedisService extends AbstractRedisService implements OnModuleInit, OnModuleDestroy {
  private isClientConnected = false;

  constructor(
    @Inject(REDIS_CLIENT)
    private readonly client: Redis,
    private readonly logger: Logger,
  ) {
    super();
  }

  /**
   * Registers event listeners on module initialization and handles connection status.
   */
  async onModuleInit() {
    this.client.on('connect', () => {
      this.isClientConnected = true;
      this.logger.info('[Redis] Connected to Redis server.');
    });

    this.client.on('error', (err: Error) => {
      this.isClientConnected = false;
      this.logger.error('[Redis] Connection error:', err.stack);
    });

    this.client.on('ready', () => {
      this.isClientConnected = true;
    });

    this.client.on('close', () => {
      this.isClientConnected = false;
    });

    if (this.client.status === 'wait') {
      await this.client.connect().catch((err: Error) => {
        this.logger.error('[Redis] Connection attempt failed:', err.stack);
      });
    }
  }

  /**
   * Gracefully disconnects Redis client on module destruction.
   */
  async onModuleDestroy() {
    if (this.client) {
      await this.client.quit();
    }
  }

  /**
   * Checks if Redis client is currently connected and ready.
   */
  isConnected(): boolean {
    return this.isClientConnected || this.client.status === 'ready';
  }

  /**
   * Gets value for key.
   */
  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (error) {
      this.logger.error(`[Redis] Error getting key "${key}":`, (error as Error).stack);
      return null;
    }
  }

  /**
   * Sets value for key with optional TTL in seconds.
   */
  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    try {
      if (ttlSeconds && ttlSeconds > 0) {
        await this.client.set(key, value, 'EX', ttlSeconds);
      } else {
        await this.client.set(key, value);
      }
    } catch (error) {
      this.logger.error(`[Redis] Error setting key "${key}":`, (error as Error).stack);
    }
  }

  /**
   * Deletes key.
   */
  async del(key: string): Promise<number> {
    try {
      return await this.client.del(key);
    } catch (error) {
      this.logger.error(`[Redis] Error deleting key "${key}":`, (error as Error).stack);
      return 0;
    }
  }

  /**
   * Checks if key exists.
   */
  async exists(key: string): Promise<boolean> {
    try {
      const count = await this.client.exists(key);
      return count > 0;
    } catch (error) {
      this.logger.error(
        `[Redis] Error checking existence for key "${key}":`,
        (error as Error).stack,
      );
      return false;
    }
  }
}
