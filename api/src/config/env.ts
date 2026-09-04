import 'dotenv/config';
import { EnvironmentVariables, environmentSchema } from './schemas/environment.schema';
import { NodeEnvironment, LogLevel } from '../infrastructure/types';

/**
 * Global static environment variables object.
 * Loaded from process.env with typed fallbacks for quick access outside NestJS DI context.
 */
const parsedEnv = environmentSchema.safeParse(process.env);

export const ENV: EnvironmentVariables = parsedEnv.success
  ? parsedEnv.data
  : {
      PORT: Number(process.env['PORT']) || 3000,
      NODE_ENV:
        (process.env['NODE_ENV'] as EnvironmentVariables['NODE_ENV']) ||
        NodeEnvironment.Development,
      DATABASE_URL: String(process.env['DATABASE_URL'] || ''),
      DUFFEL_ACCESS_TOKEN: String(process.env['DUFFEL_ACCESS_TOKEN'] || ''),
      LOG_LEVEL: (process.env['LOG_LEVEL'] as EnvironmentVariables['LOG_LEVEL']) || LogLevel.Info,
      JWT_SECRET: String(process.env['JWT_SECRET'] || 'your_jwt_secret_key_here'),
      JWT_EXPIRATION: String(process.env['JWT_EXPIRATION'] || '3600s'),
      THROTTLE_TTL: Number(process.env['THROTTLE_TTL']) || 60000,
      THROTTLE_LIMIT: Number(process.env['THROTTLE_LIMIT']) || 10,
      MAIL_HOST: String(process.env['MAIL_HOST'] || 'localhost'),
      MAIL_PORT: Number(process.env['MAIL_PORT']) || 1025,
      MAIL_USER:
        typeof process.env['MAIL_USER'] === 'string' && process.env['MAIL_USER'] !== 'null'
          ? process.env['MAIL_USER']
          : null,
      MAIL_PASS:
        typeof process.env['MAIL_PASS'] === 'string' && process.env['MAIL_PASS'] !== 'null'
          ? process.env['MAIL_PASS']
          : null,
      MAIL_SECURE: process.env['MAIL_SECURE'] === 'true',
      MAIL_FROM: String(process.env['MAIL_FROM'] || '"SkyAirlines" <noreply@skyairlines.com>'),
      REDIS_HOST: String(process.env['REDIS_HOST'] || 'localhost'),
      REDIS_PORT: Number(process.env['REDIS_PORT']) || 6379,
      REDIS_PASSWORD:
        typeof process.env['REDIS_PASSWORD'] === 'string' &&
        process.env['REDIS_PASSWORD'] !== 'null'
          ? process.env['REDIS_PASSWORD']
          : null,
      REDIS_DB: Number(process.env['REDIS_DB']) || 0,
      REDIS_KEY_PREFIX: String(process.env['REDIS_KEY_PREFIX'] || 'sky_airlines:'),
    };
