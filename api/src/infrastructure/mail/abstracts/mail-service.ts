export interface SendMailOptions {
  to: string;
  subject: string;
  template?: string;
  context?: Record<string, unknown>;
  text?: string;
  html?: string;
}

/**
 * Abstract class acting as a token for the shared Mail Service.
 */
export abstract class AbstractMailService {
  /**
   * Checks if the mail provider is currently reachable and configured.
   *
   * @returns {boolean} True if the provider is ready to send emails.
   */
  abstract isAvailable(): boolean;

  /**
   * Sends an email with the provided options.
   *
   * @param options Configuration for the email (recipient, subject, content).
   * @returns {Promise<void>} Resolves when the email is dispatched.
   */
  abstract sendMail(options: SendMailOptions): Promise<void>;
}
