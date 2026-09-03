import { Global, Module } from '@nestjs/common';
import { HashingService } from './hashing.service';

/**
 * Global infrastructure security module exporting HashingService across the application.
 */
@Global()
@Module({
  providers: [HashingService],
  exports: [HashingService],
})
export class SecurityModule {}
