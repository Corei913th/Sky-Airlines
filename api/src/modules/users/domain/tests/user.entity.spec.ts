import { UserRole } from '@prisma/client';
import { User } from '../entities/user.entity';

/**
 * Unit tests verifying User domain entity behavior and invariant updates.
 */
describe('User Domain Entity', () => {
  /**
   * Verifies that creating a new User entity assigns default properties correctly.
   */
  it('should create a new user entity with default values', () => {
    const user = User.create({ email: 'test@example.com' });

    expect(user.id).toBeDefined();
    expect(user.email).toBe('test@example.com');
    expect(user.emailVerified).toBe(false);
    expect(user.role).toBe(UserRole.CLIENT);
    expect(user.firstName).toBeNull();
    expect(user.lastName).toBeNull();
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  /**
   * Verifies that updating profile fields modifies first name and last name.
   */
  it('should update user profile details', () => {
    const user = User.create({ email: 'john@example.com' });
    user.updateProfile('John', 'Doe');

    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Doe');
  });

  /**
   * Verifies that email verification marks emailVerified as true.
   */
  it('should mark email as verified', () => {
    const user = User.create({ email: 'verified@example.com' });
    user.markEmailAsVerified();

    expect(user.emailVerified).toBe(true);
  });

  /**
   * Verifies that changing the role updates the user role property.
   */
  it('should change user role', () => {
    const user = User.create({ email: 'admin@example.com' });
    user.changeRole(UserRole.ADMIN);

    expect(user.role).toBe(UserRole.ADMIN);
  });
});
