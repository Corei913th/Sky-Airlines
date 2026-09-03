import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Global infrastructure module providing PrismaService across the application.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
