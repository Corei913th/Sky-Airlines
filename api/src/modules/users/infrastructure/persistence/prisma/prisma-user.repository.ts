import { Injectable } from '@nestjs/common';
import type { User as PrismaUser } from '@prisma/client';
import { PrismaRepository } from '@/infrastructure/prisma/repositories/prisma.repository';
import { PrismaService } from '@/infrastructure/prisma/prisma.service';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { UserMapper } from './mappers/user.mapper';

/**
 * Concrete Prisma implementation of the UserRepository domain contract.
 */
@Injectable()
export class PrismaUserRepository extends PrismaRepository<PrismaUser> implements UserRepository {
  constructor(
    prisma: PrismaService,
    private readonly userMapper: UserMapper,
  ) {
    super(prisma);
  }

  /**
   * Finds a user entity by its unique identifier.
   */
  async findById(id: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({
      where: { id },
    });

    return raw ? this.userMapper.toDomain(raw) : null;
  }

  /**
   * Finds a user entity by its email address.
   */
  async findByEmail(email: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({
      where: { email },
    });

    return raw ? this.userMapper.toDomain(raw) : null;
  }

  /**
   * Saves or updates a user entity in PostgreSQL database using Prisma.
   */
  async save(user: User): Promise<User> {
    const data = this.userMapper.toPersistence(user);

    const persisted = await this.prisma.user.upsert({
      where: { id: user.id },
      create: data,
      update: {
        email: data.email,
        emailVerified: data.emailVerified,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
      },
    });

    return this.userMapper.toDomain(persisted);
  }

  /**
   * Retrieves all user entities from the database.
   */
  async findAll(): Promise<User[]> {
    const rawUsers = await this.prisma.user.findMany();
    return rawUsers.map((raw) => this.userMapper.toDomain(raw));
  }

  /**
   * Removes a user entity by its unique identifier.
   */
  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      return true;
    } catch {
      return false;
    }
  }
}
