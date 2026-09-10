import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import type {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto,
} from '../../presentation/dto/user.schema';
import { UserDtoMapper } from '../mappers/user-dto.mapper';

/**
 * Application service managing User use cases.
 */
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userDtoMapper: UserDtoMapper,
  ) {}

  /**
   * Creates a new user in the system.
   */
  async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException(`User with email '${dto.email}' already exists.`);
    }

    const userEntity = User.create({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: dto.role,
    });

    const saved = await this.userRepository.save(userEntity);
    return this.userDtoMapper.toResponseDto(saved);
  }

  /**
   * Retrieves a user by identifier.
   */
  async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID '${id}' not found.`);
    }
    return this.userDtoMapper.toResponseDto(user);
  }

  /**
   * Retrieves a user by email address.
   */
  async getUserByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email '${email}' not found.`);
    }
    return this.userDtoMapper.toResponseDto(user);
  }

  /**
   * Retrieves all users.
   */
  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => this.userDtoMapper.toResponseDto(user));
  }

  /**
   * Updates an existing user profile.
   */
  async updateUser(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID '${id}' not found.`);
    }

    user.updateProfile(dto.firstName, dto.lastName);
    if (dto.role) {
      user.changeRole(dto.role);
    }

    const updated = await this.userRepository.save(user);
    return this.userDtoMapper.toResponseDto(updated);
  }

  /**
   * Deletes a user by identifier.
   */
  async deleteUser(id: string): Promise<boolean> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID '${id}' not found.`);
    }
    return this.userRepository.delete(id);
  }
}
