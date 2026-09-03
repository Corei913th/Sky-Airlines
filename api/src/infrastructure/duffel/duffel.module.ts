import { Module } from '@nestjs/common';
import { duffelClientProvider } from './duffel.client';

/**
 * Infrastructure module exporting the Duffel Flights API client instance provider.
 */
@Module({
  providers: [duffelClientProvider],
  exports: [duffelClientProvider],
})
export class DuffelModule {}
