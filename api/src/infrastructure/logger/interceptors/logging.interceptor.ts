import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { randomUUID } from 'node:crypto';
import { LoggerService as Logger } from '../logger';
import { Request } from 'express';
import { User as UserEntity } from '@prisma/client';

/**
 * Express Request interface extension containing optional authenticated user entity.
 */
interface AuthenticatedRequest extends Request {
  user?: UserEntity;
}

/**
 * Interceptor logging incoming HTTP requests, correlation IDs, and execution durations.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  /**
   * Intercepts HTTP execution context to wrap requests with correlation ID and log request metrics.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request: AuthenticatedRequest = context.switchToHttp().getRequest();

    const correlationId = randomUUID();
    const userId = request.user?.id;
    const now = Date.now();

    return Logger.runWithContext({ correlationId, userId }, () => {
      this.logger.info(`Incoming Request: ${request.method} ${request.url}`, {
        ip: request.ip,
        userAgent: request.headers['user-agent'],
      });

      return next.handle().pipe(
        tap({
          next: () => {
            this.logger.info(`Request Completed: ${request.method} ${request.url}`, {
              duration: `${Date.now() - now}ms`,
            });
          },
          error: (err: unknown) => {
            const error = err as Error;
            this.logger.error(`Request Failed: ${request.method} ${request.url}`, error.stack, {
              duration: `${Date.now() - now}ms`,
            });
          },
        }),
      );
    });
  }
}
