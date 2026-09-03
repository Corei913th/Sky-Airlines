/**
 * Normalize a trace object to a string representation for logging.
 *
 * @param trace - The trace error or object to normalize.
 * @returns The normalized trace string or undefined.
 */
export function normalizeTrace(trace?: unknown): string | undefined {
  if (trace == null) return undefined;
  if (typeof trace === 'string') return trace;
  if (trace instanceof Error) return trace.stack ?? trace.message;
  if (typeof trace === 'object') {
    try {
      return JSON.stringify(trace);
    } catch {
      return '[Unserializable trace object]';
    }
  }
  if (typeof trace === 'number' || typeof trace === 'boolean' || typeof trace === 'bigint')
    return `${trace}`;
  if (typeof trace === 'symbol')
    return trace.description ? `Symbol(${trace.description})` : trace.toString();
  if (typeof trace === 'function') return trace.name ? `[Function: ${trace.name}]` : '[Function]';
  return '[Unsupported trace type]';
}

/**
 * Normalize a data payload object to a plain key-value record for Pino logging.
 *
 * @param data - The data object or error to normalize.
 * @returns The normalized record object.
 */
export function normalizeData(data?: unknown): Record<string, unknown> {
  if (data == null) return {};
  if (data instanceof Error) {
    return {
      err: {
        name: data.name,
        message: data.message,
        stack: data.stack,
      },
    };
  }
  if (typeof data === 'object') return data as Record<string, unknown>;
  return { data };
}
