import type { EnvironmentVariables } from './schemas/environment.schema';
import { environmentSchema } from './schemas/environment.schema';

/**
 * Validates a raw configuration record against the Zod environment schema.
 * Throws a descriptive Error if environment variables fail validation.
 *
 * @param config - Unvalidated configuration key-value map (usually process.env).
 * @returns Fully parsed and typed EnvironmentVariables object.
 */
export function validate(config: Record<string, unknown>): EnvironmentVariables {
  const result = environmentSchema.safeParse(config);

  if (!result.success) {
    throw new Error(`Configuration validation failed:\n${result.error.message}`);
  }

  return result.data;
}
