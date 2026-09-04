/**
 * Abstract class acting as a token and contract for the Redis Service port.
 */
export abstract class AbstractRedisService {
  /**
   * Retrieves a string value by key from Redis.
   *
   * @param key The key to retrieve.
   * @returns {Promise<string | null>} The string value or null if not found.
   */
  abstract get(key: string): Promise<string | null>;

  /**
   * Stores a string value with an optional Time-To-Live (TTL) in seconds.
   *
   * @param key The key to set.
   * @param value The string value to store.
   * @param ttlSeconds Optional expiration duration in seconds.
   * @returns {Promise<void>}
   */
  abstract set(key: string, value: string, ttlSeconds?: number): Promise<void>;

  /**
   * Deletes a key from Redis.
   *
   * @param key The key to delete.
   * @returns {Promise<number>} Number of keys deleted (0 or 1).
   */
  abstract del(key: string): Promise<number>;

  /**
   * Checks if a key exists in Redis.
   *
   * @param key The key to check.
   * @returns {Promise<boolean>} True if the key exists.
   */
  abstract exists(key: string): Promise<boolean>;

  /**
   * Returns whether the Redis client is currently connected and ready.
   *
   * @returns {boolean} True if client is connected.
   */
  abstract isConnected(): boolean;
}
