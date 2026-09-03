import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from '@/modules/shared/shared.constants';

/**
 * Infrastructure security service for password hashing and verification.
 */
@Injectable()
export class HashingService {
  /**
   * Hashes a plain-text password using bcrypt.
   *
   * @param plain - The plain-text password to hash.
   * @returns Promise resolving to the generated bcrypt hash string.
   */
  async hash(plain: string, saltRounds?: number): Promise<string> {
    return bcrypt.hash(plain, saltRounds ?? BCRYPT_SALT_ROUNDS);
  }

  /**
   * Compares a candidate plain-text password against a stored bcrypt hash.
   *
   * @param plain - The plain-text password candidate.
   * @param hash - The stored bcrypt hash to compare against.
   * @returns Promise resolving to boolean `true` if matched, `false` otherwise.
   */
  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
