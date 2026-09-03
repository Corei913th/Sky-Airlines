import 'dotenv/config';
import { EnvironmentVariables } from './schemas/environment.schema';
import { NodeEnvironment, LogLevel } from '../infrastructure/types';

/**
 * Global static environment variables object.
 * Loaded from process.env with typed fallbacks for quick access outside NestJS DI context.
 */
export const ENV: EnvironmentVariables = {
  PORT: Number(process.env['PORT']) || 3000,
  NODE_ENV:
    (process.env['NODE_ENV'] as EnvironmentVariables['NODE_ENV']) || NodeEnvironment.Development,
  DATABASE_URL: String(process.env['DATABASE_URL'] || ''),
  DUFFEL_ACCESS_TOKEN: String(process.env['DUFFEL_ACCESS_TOKEN'] || ''),
  LOG_LEVEL: (process.env['LOG_LEVEL'] as EnvironmentVariables['LOG_LEVEL']) || LogLevel.Info,
};
