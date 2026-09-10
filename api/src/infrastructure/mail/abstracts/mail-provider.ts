import type { SendMailOptions } from './mail-service';

/**
 * Port for mail delivery implementations.
 */
export abstract class AbstractMailProvider {
  /**
   * Sends the mail using the underlying technical provider.
   *
   * @param payload The mail content and recipient.
   * @returns {Promise<void>} Resolves when the mail is dispatched.
   */
  abstract send(payload: SendMailOptions): Promise<void>;

  /**
   * Verifies the connection to the provider.
   *
   * @returns {Promise<void>} Resolves when connectivity is confirmed.
   */
  verify?(): Promise<void>;
}
