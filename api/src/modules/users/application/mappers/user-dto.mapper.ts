import { Injectable } from '@nestjs/common';
import type { User } from '../../domain/entities/user.entity';
import type { UserResponseDto } from '../../presentation/dto/user.schema';

/**
 * Application mapper converting between User domain entities and API DTOs.
 */
@Injectable()
export class UserDtoMapper {
  /**
   * Converts a User domain entity into a UserResponseDto.
   */
  toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
