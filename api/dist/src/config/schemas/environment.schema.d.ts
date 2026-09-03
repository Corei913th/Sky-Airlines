import { NodeEnvironment, LogLevel } from '../../infrastructure/types';
import { z } from 'zod';
export declare const environmentSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        development: NodeEnvironment.Development;
        production: NodeEnvironment.Production;
        test: NodeEnvironment.Test;
    }>>;
    LOG_LEVEL: z.ZodDefault<z.ZodEnum<{
        info: LogLevel.Info;
        error: LogLevel.Error;
        warning: LogLevel.Warning;
        debug: LogLevel.Debug;
    }>>;
    PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    DATABASE_URL: z.ZodString;
    DUFFEL_ACCESS_TOKEN: z.ZodString;
}, z.core.$strip>;
export type EnvironmentVariables = z.infer<typeof environmentSchema>;
