import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { CustomLogger as Logger } from '@/infrastructure/logger/logger';
import { ENV } from '@/config/env';

/**
 * Provider wrapping the generated PrismaClient with Prisma PostgreSQL driver adapter.
 * Manages database connection lifecycles via module init and destroy hooks.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const pool = new Pool({ connectionString: ENV.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  /**
   * Initializes database connection when the module starts.
   */
  async onModuleInit() {
    this.logger.info('Connecting to Prisma database...');
    await this.$connect();
    this.logger.info('Successfully connected to database.');
  }

  /**
   * Gracefully disconnects database connection when the application shuts down.
   */
  async onModuleDestroy() {
    this.logger.info('Disconnecting from Prisma database...');
    await this.$disconnect();
  }
}
