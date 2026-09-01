import * as bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from '../shared.constants';

export class HashHelper {
  /**
   * Hashes a plain-text password using bcrypt.
   *
   * @param plain The plain-text password.
   * @returns The bcrypt hash.
   */
  static async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, BCRYPT_SALT_ROUNDS);
  }

  /**
   * Compares a plain-text password against a stored bcrypt hash.
   *
   * @param plain The plain-text candidate password.
   * @param hash  The stored hash from the database.
   * @returns `true` if the passwords match, `false` otherwise.
   */
  static async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
