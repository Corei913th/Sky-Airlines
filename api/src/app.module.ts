import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { DuffelModule } from './infrastructure/duffel/duffel.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { SecurityModule } from './infrastructure/security/security.module';
import { validate } from './config/validation';
import { ENV } from './config/env';
import { MailModule } from './infrastructure/mail/mail.module';
import { RedisModule } from './infrastructure/redis/redis.module';

/**
 * Root application module bootstrapping core infrastructure (Prisma, Duffel, Logger, Security, Redis, Config).
 * Uses static ENV object as configuration factory source.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => ENV],
      validate,
    }),
    LoggerModule,
    PrismaModule,
    RedisModule,
    MailModule,
    DuffelModule,
    SecurityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
