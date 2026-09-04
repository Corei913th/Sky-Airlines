import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { AbstractMailProvider } from '../abstracts/mail-provider';
import { SendMailOptions } from '../abstracts/mail-service';
import { LoggerService } from '@/infrastructure/logger/logger';
import { ENV } from '@/config/env';

/**
 * Nodemailer implementation of the abstract MailProvider.
 */
@Injectable()
export class NodemailerMailProvider implements AbstractMailProvider {
  private readonly transporter?: nodemailer.Transporter;

  constructor(private readonly logger: LoggerService) {
    const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, MAIL_SECURE } = ENV;

    if (!MAIL_HOST || !MAIL_PORT) {
      this.logger.warn(
        '[MailProvider] WARNING: Incomplete SMTP host or port configuration. Emails will be ignored.',
      );
      return;
    }

    this.transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT,
      secure: MAIL_SECURE,
      auth: MAIL_USER && MAIL_PASS ? { user: MAIL_USER, pass: MAIL_PASS } : undefined,
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 5000,
    });
  }

  /**
   * Sends an email via Nodemailer.
   *
   * @param payload The email content options.
   * @returns {Promise<void>}
   */
  async send(payload: SendMailOptions): Promise<void> {
    if (!this.transporter) {
      this.logger.error('Cannot send email: Mail provider is not configured (missing host/port).');
      return;
    }

    await this.transporter.sendMail({
      from: ENV.MAIL_FROM,
      ...payload,
    });
  }

  /**
   * Verifies SMTP connection readiness.
   *
   * @returns {Promise<void>}
   */
  async verify(): Promise<void> {
    if (!this.transporter) return;
    await this.transporter.verify();
  }
}
