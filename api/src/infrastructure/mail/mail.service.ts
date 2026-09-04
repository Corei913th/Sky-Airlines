import { Injectable, OnModuleInit } from '@nestjs/common';
import { AbstractMailService, SendMailOptions } from './abstracts/mail-service';
import { AbstractMailProvider } from './abstracts/mail-provider';
import { LoggerService as Logger } from '@/infrastructure/logger/logger';

/**
 * Concrete implementation of the abstract MailService port.
 * Delegates actual email delivery to an injected MailProvider implementation.
 */
@Injectable()
export class MailService extends AbstractMailService implements OnModuleInit {
  private isProviderAvailable = false;

  /**
   * Initializes DefaultMailService.
   *
   * @param mailProvider Technical adapter for mail delivery.
   * @param logger Service for activity tracing.
   */
  constructor(
    private readonly mailProvider: AbstractMailProvider,
    private readonly logger: Logger,
  ) {
    super();
  }

  /**
   * Verifies connectivity on module startup in background.
   */
  onModuleInit() {
    this.verifyConnection().catch(() => {});
  }

  /**
   * Returns whether the mail provider is currently available.
   */
  isAvailable(): boolean {
    return this.isProviderAvailable;
  }

  /**
   * Verifies connectivity on module startup or on-demand.
   */
  private async verifyConnection(): Promise<void> {
    if (!this.mailProvider.verify) {
      this.isProviderAvailable = true;
      return;
    }

    try {
      await this.mailProvider.verify();
      this.isProviderAvailable = true;
      this.logger.info('Mail provider connection verified.');
    } catch (error) {
      this.isProviderAvailable = false;
      this.logger.error(
        'Mail provider connection failed. Emails will be skipped until the service is back online.',
        (error as Error).stack,
      );
    }
  }

  /**
   * Orchestrates the email sending process: validates options and delegates to provider.
   *
   * @param options Recipient, subject and content.
   */
  async sendMail(options: SendMailOptions): Promise<void> {
    this.validateOptions(options);

    if (!this.isProviderAvailable) {
      await this.verifyConnection();
    }

    if (!this.isProviderAvailable) {
      this.logger.warn('Skipping email: Mail provider is unavailable.', {
        to: options.to,
        subject: options.subject,
      });
      return;
    }

    try {
      await this.mailProvider.send(options);
      this.logger.info('Email sent successfully', {
        to: options.to,
        subject: options.subject,
      });
    } catch (error) {
      this.isProviderAvailable = false;
      this.logger.error('Email sending failed', (error as Error).stack, {
        to: options.to,
        subject: options.subject,
      });
      throw error;
    }
  }

  private validateOptions(options: SendMailOptions): void {
    if (!options.to) throw new Error('Recipient (to) is required.');
    if (!options.subject) throw new Error('Subject is required.');
    if (!options.text && !options.html) {
      throw new Error('Email content (text or html) is required.');
    }
  }
}
