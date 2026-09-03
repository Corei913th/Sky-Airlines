import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { LoggerService as Logger } from "../../../infrastructure/logger/logger";
export declare class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger;
    constructor(logger: Logger);
    catch(exception: any, host: ArgumentsHost): void;
}
