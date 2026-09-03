import { AsyncLocalStorage } from 'node:async_hooks';
import { ILoggerContext } from './interfaces/ilogger-context';
export declare class LoggerService {
    private readonly logger;
    static readonly storage: AsyncLocalStorage<ILoggerContext>;
    constructor(context?: string);
    static runWithContext<T>(context: ILoggerContext, fn: () => T): T;
    private getContextData;
    info(message: string, data?: unknown): void;
    warn(message: string, data?: unknown): void;
    error(message: string, trace?: unknown, data?: unknown): void;
    debug(message: string, data?: unknown): void;
    fatal(message: string, data?: unknown): void;
}
export declare const CustomLogger: typeof LoggerService;
