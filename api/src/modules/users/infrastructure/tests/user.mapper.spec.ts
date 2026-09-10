import { UserRole } from '@prisma/client';
import type { User as PrismaUser } from '@prisma/client';
import { UserMapper } from '../persistence/prisma/mappers/user.mapper';
import { User } from '../../domain/entities/user.entity';

/**
 * Unit tests verifying bi-directional mapping between PrismaUser models and User domain entities.
 */
describe('UserMapper', () => {
  let mapper: UserMapper;

  beforeEach(() => {
    mapper = new UserMapper();
  });

  /**
   * Verifies conversion from Prisma User persistence model to User domain entity.
   */
  it('should map PrismaUser model to User domain entity', () => {
    const rawPrismaUser: PrismaUser = {
      id: 'uuid-123',
      email: 'jane@example.com',
      emailVerified: true,
      firstName: 'Jane',
      lastName: 'Doe',
      role: UserRole.CLIENT,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const entity = mapper.toDomain(rawPrismaUser);

    expect(entity).toBeInstanceOf(User);
    expect(entity.id).toBe('uuid-123');
    expect(entity.email).toBe('jane@example.com');
    expect(entity.emailVerified).toBe(true);
    expect(entity.firstName).toBe('Jane');
    expect(entity.lastName).toBe('Doe');
  });

  /**
   * Verifies conversion from User domain entity to Prisma User persistence object.
   */
  it('should map User domain entity to Prisma persistence object', () => {
    const entity = User.create({
      id: 'uuid-456',
      email: 'alex@example.com',
      firstName: 'Alex',
      lastName: 'Smith',
      role: UserRole.ADMIN,
    });

    const persistenceObj = mapper.toPersistence(entity);

    expect(persistenceObj.id).toBe('uuid-456');
    expect(persistenceObj.email).toBe('alex@example.com');
    expect(persistenceObj.firstName).toBe('Alex');
    expect(persistenceObj.lastName).toBe('Smith');
    expect(persistenceObj.role).toBe(UserRole.ADMIN);
  });
});
