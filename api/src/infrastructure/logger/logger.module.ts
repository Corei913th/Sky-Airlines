import { Module, Global, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';
import { LoggerService } from './logger';

/**
 * Global infrastructure logging module providing context-aware transient LoggerService instances.
 * Automatically injects calling class context via NestJS INQUIRER.
 */
@Global()
@Module({
  providers: [
    {
      provide: LoggerService,
      useFactory: (inquirer: object) => {
        return new LoggerService(inquirer?.constructor?.name || 'App');
      },
      inject: [INQUIRER],
      scope: Scope.TRANSIENT,
    },
  ],
  exports: [LoggerService],
})
export class LoggerModule {}
