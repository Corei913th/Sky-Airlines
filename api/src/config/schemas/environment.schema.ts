import { NodeEnvironment, LogLevel } from '../../infrastructure/types';
import { z } from 'zod';

/**
 * Zod validation schema for application environment variables.
 * Enforces strong typing and default fallback values for runtime configuration.
 */
export const environmentSchema = z.object({
  /** Current runtime environment execution mode. */
  NODE_ENV: z.enum(Object.values(NodeEnvironment)).default(NodeEnvironment.Development),

  /** Logging verbosity level for Pino logger. */
  LOG_LEVEL: z.enum(Object.values(LogLevel)).default(LogLevel.Info),

  /** HTTP server port number. */
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),

  /** Database connection string URL. */
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  /** Duffel Flights API bearer access token. */
  DUFFEL_ACCESS_TOKEN: z.string().min(1, 'DUFFEL_ACCESS_TOKEN is required'),

  /** Secret key for JWT signature and verification. */
  JWT_SECRET: z.string().default('your_jwt_secret_key_here'),

  /** JWT token expiration duration string (e.g. 3600s, 1d). */
  JWT_EXPIRATION: z.string().default('3600s'),

  /** Throttler rate limiting Time-To-Live in milliseconds. */
  THROTTLE_TTL: z.coerce.number().int().default(60000),

  /** Throttler max request limit per TTL window. */
  THROTTLE_LIMIT: z.coerce.number().int().default(10),

  /** SMTP Mail server hostname. */
  MAIL_HOST: z.string().default('localhost'),

  /** SMTP Mail server port. */
  MAIL_PORT: z.coerce.number().int().default(1025),

  /** SMTP Mail server user account. */
  MAIL_USER: z
    .preprocess(
      (val) => (typeof val === 'string' && val !== 'null' && val.trim().length > 0 ? val : null),
      z.string().nullable(),
    )
    .default(null),

  /** SMTP Mail server password. */
  MAIL_PASS: z
    .preprocess(
      (val) => (typeof val === 'string' && val !== 'null' && val.trim().length > 0 ? val : null),
      z.string().nullable(),
    )
    .default(null),

  /** SMTP Mail server TLS/SSL secure flag. */
  MAIL_SECURE: z.preprocess((val) => val === 'true' || val === true, z.boolean()).default(false),

  /** Default email sender address header. */
  MAIL_FROM: z.string().default('"SkyAirlines" <noreply@skyairlines.com>'),

  /** Redis server hostname. */
  REDIS_HOST: z.string().default('localhost'),

  /** Redis server port number. */
  REDIS_PORT: z.coerce.number().int().default(6379),

  /** Redis server auth password. */
  REDIS_PASSWORD: z
    .preprocess(
      (val) => (typeof val === 'string' && val !== 'null' && val.trim().length > 0 ? val : null),
      z.string().nullable(),
    )
    .default(null),

  /** Redis database index (0-15). */
  REDIS_DB: z.coerce.number().int().default(0),

  /** Global key namespace prefix for Redis keys. */
  REDIS_KEY_PREFIX: z.string().default('sky_airlines:'),
});

/** Inferred TypeScript type derived from the environment Zod schema. */
export type EnvironmentVariables = z.infer<typeof environmentSchema>;
