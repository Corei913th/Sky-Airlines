/**
 * Contextual metadata attached to asynchronous log requests.
 */
export interface ILoggerContext {
  /** Unique request trace identifier for request correlation. */
  correlationId?: string;

  /** Authenticated user identifier, if request is authenticated. */
  userId?: string;
}
