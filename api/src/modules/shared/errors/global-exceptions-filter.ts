import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../responses/api-response';
import { LoggerService as Logger } from '@/infrastructure/logger/logger';
import { ENV } from '@/config/env';
import { NodeEnvironment } from '@/infrastructure/types';

/**
 * Global filter to catch all unhandled exceptions and format them as ApiResponse.
 * It ensures consistent error communication with API consumers.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Une erreur interne est survenue sur le serveur.';
    let data: any = null;

    // Handle NestJS Built-in Exceptions (HTTP 4xx/5xx)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse() as Record<string, unknown> | string;

      if (status === HttpStatus.BAD_REQUEST && typeof res === 'object') {
        const validationMessage = res.message;
        message = 'Erreur de validation des données.';
        data = {
          errors: Array.isArray(validationMessage) ? validationMessage : res,
        };
      } else {
        message =
          typeof res === 'object'
            ? (res.message as string) || exception.message
            : exception.message;
      }
    }
    // Handle generic Errors
    else if (exception instanceof Error) {
      message = exception.message;
    }

    // Mask internal error details in production
    const isProduction = ENV.NODE_ENV === NodeEnvironment.Production;
    if (status === HttpStatus.INTERNAL_SERVER_ERROR && isProduction) {
      message = 'Une erreur imprévue est survenue. Veuillez contacter le support.';
      data = null;
    }

    // Log the error for server-side tracking
    this.logger.error(
      `${request.method} ${request.url} - Error: ${message}`,
      exception instanceof Error ? exception.stack : String(exception),
      {
        statusCode: status,
        path: request.url,
        timestamp: new Date().toISOString(),
      },
    );

    // Send uniform response
    response.status(status).json(ApiResponse.error(message, data));
  }
}
