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
});

/** Inferred TypeScript type derived from the environment Zod schema. */
export type EnvironmentVariables = z.infer<typeof environmentSchema>;
