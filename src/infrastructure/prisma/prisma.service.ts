import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../../generated/prisma/client';
import { CustomLogger as Logger } from '@/infrastructure/logger/logger';

/**
 * Provider wrapping the generated PrismaClient.
 * Manages database connection lifecycles via NestJS module init and destroy hooks.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
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
