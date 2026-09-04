import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { AbstractMailService } from './abstracts/mail-service';
import { NodemailerMailProvider } from './providers/nodemailer-provider';
import { AbstractMailProvider } from './abstracts/mail-provider';

/**
 * Global infrastructure module providing email delivery services across the application.
 */
@Global()
@Module({
  providers: [
    NodemailerMailProvider,
    {
      provide: AbstractMailProvider,
      useExisting: NodemailerMailProvider,
    },
    {
      provide: AbstractMailService,
      useClass: MailService,
    },
  ],
  exports: [AbstractMailService, AbstractMailProvider],
})
export class MailModule {}
