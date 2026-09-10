import { Injectable } from '@nestjs/common';
import type { User as PrismaUser } from '@prisma/client';
import { User } from '../../../../domain/entities/user.entity';

/**
 * Mapper converting between Prisma User persistence model and User domain entity.
 */
@Injectable()
export class UserMapper {
  /**
   * Converts a Prisma User persistence model into a User domain entity.
   */
  toDomain(raw: PrismaUser): User {
    return User.reconstitute({
      id: raw.id,
      email: raw.email,
      emailVerified: raw.emailVerified,
      firstName: raw.firstName,
      lastName: raw.lastName,
      role: raw.role,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  /**
   * Converts a User domain entity into a Prisma User creation / persistence object.
   */
  toPersistence(user: User): Omit<PrismaUser, 'createdAt' | 'updatedAt'> {
    return {
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
  }
}
