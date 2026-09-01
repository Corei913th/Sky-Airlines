import { Injectable, Scope, Optional } from '@nestjs/common';
import pino, { Logger as PinoLogger } from 'pino';
import { AsyncLocalStorage } from 'node:async_hooks';
import { ILoggerContext } from './interfaces/ilogger-context';
import { normalizeTrace, normalizeData } from './logger.util';
import { ENV } from '@/config/env';
import { NodeEnvironment, LogLevel } from '@/infrastructure/types';

/**
 * Context-aware transient infrastructure logger service wrapping Pino.
 * Uses Node.js AsyncLocalStorage to automatically attach correlationId and userId to logs.
 */
@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
  private readonly logger: PinoLogger;

  /** AsyncLocalStorage store holding request context across async execution threads. */
  public static readonly storage = new AsyncLocalStorage<ILoggerContext>();

  /**
   * Creates a new instance of LoggerService.
   * @param context - The context name (usually controller/service name).
   */
  constructor(@Optional() context: string = 'Application') {
    const isDev = ENV.NODE_ENV !== NodeEnvironment.Production;

    this.logger = pino({
      level: ENV.LOG_LEVEL || LogLevel.Info,
      transport: isDev
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:standard',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
    }).child({ context });
  }

  /**
   * Run a function within a specific logging context (correlationId, userId).
   *
   * @param context - Request context containing correlationId and optional userId.
   * @param fn - Asynchronous or synchronous function to execute within the context.
   */
  static runWithContext<T>(context: ILoggerContext, fn: () => T): T {
    return LoggerService.storage.run(context, fn);
  }

  /**
   * Retrieves active context data from AsyncLocalStorage.
   */
  private getContextData(): ILoggerContext {
    return LoggerService.storage.getStore() || {};
  }

  /** Log info level message with metadata. */
  info(message: string, data?: unknown) {
    this.logger.info({ ...this.getContextData(), ...normalizeData(data) }, message);
  }

  /** Log warning level message with metadata. */
  warn(message: string, data?: unknown) {
    this.logger.warn({ ...this.getContextData(), ...normalizeData(data) }, message);
  }

  /** Log error level message with normalized stack trace and metadata. */
  error(message: string, trace?: unknown, data?: unknown) {
    this.logger.error(
      { ...this.getContextData(), ...normalizeData(data), trace: normalizeTrace(trace) },
      message,
    );
  }

  /** Log debug level message with metadata. */
  debug(message: string, data?: unknown) {
    this.logger.debug({ ...this.getContextData(), ...normalizeData(data) }, message);
  }

  /** Log fatal level message with metadata. */
  fatal(message: string, data?: unknown) {
    this.logger.fatal({ ...this.getContextData(), ...normalizeData(data) }, message);
  }
}

/** Alias for LoggerService for backwards compatibility. */
export const CustomLogger = LoggerService;
