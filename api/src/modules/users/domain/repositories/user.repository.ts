import type { User } from '../entities/user.entity';

/**
 * Domain repository contract for User entity persistence operations.
 */
export abstract class UserRepository {
  /**
   * Finds a user entity by its unique identifier.
   */
  abstract findById(id: string): Promise<User | null>;

  /**
   * Finds a user entity by its email address.
   */
  abstract findByEmail(email: string): Promise<User | null>;

  /**
   * Saves or updates a user entity in persistence storage.
   */
  abstract save(user: User): Promise<User>;

  /**
   * Retrieves all user entities.
   */
  abstract findAll(): Promise<User[]>;

  /**
   * Removes a user entity by its unique identifier.
   */
  abstract delete(id: string): Promise<boolean>;
}
