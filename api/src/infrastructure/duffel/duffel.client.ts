import { Duffel } from '@duffel/api';
import { ConfigService } from '@nestjs/config';
import { ENV } from '@/config/env';
import { NodeEnvironment } from '../types';

/**
 * Injection token for the Duffel API client instance.
 */
export const DUFFEL_CLIENT = 'DUFFEL_CLIENT';

/**
 * Factory provider creating and configuring the Duffel API client instance.
 */
export const duffelClientProvider = {
  provide: DUFFEL_CLIENT,
  useFactory: (configService: ConfigService): Duffel => {
    const token = configService.get<string>('DUFFEL_ACCESS_TOKEN') || ENV.DUFFEL_ACCESS_TOKEN;
    return new Duffel({
      token,
      debug: { verbose: ENV.NODE_ENV === NodeEnvironment.Development },
    });
  },
  inject: [ConfigService],
};
