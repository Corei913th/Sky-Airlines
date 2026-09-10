import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserDtoMapper } from '../mappers/user-dto.mapper';
import { User } from '../../domain/entities/user.entity';

/**
 * Unit tests verifying UserService application use cases and error handling.
 */
describe('UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const repositoryMock: Partial<jest.Mocked<UserRepository>> = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserDtoMapper,
        {
          provide: UserRepository,
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(UserRepository);
  });

  /**
   * Verifies successful user creation when the email is unique.
   */
  it('should create a new user when email does not exist', async () => {
    repository.findByEmail.mockResolvedValue(null);
    repository.save.mockImplementation(async (user: User) => Promise.resolve(user));

    const result = await service.createUser({
      email: 'newuser@example.com',
      firstName: 'New',
      lastName: 'User',
    });

    expect(result.email).toBe('newuser@example.com');
    expect(result.firstName).toBe('New');
    expect(repository.save).toHaveBeenCalled();
  });

  /**
   * Verifies that attempting to create a user with an existing email throws ConflictException.
   */
  it('should throw ConflictException if email already exists', async () => {
    const existing = User.create({ email: 'duplicate@example.com' });
    repository.findByEmail.mockResolvedValue(existing);

    await expect(service.createUser({ email: 'duplicate@example.com' })).rejects.toThrow(
      ConflictException,
    );
  });

  /**
   * Verifies retrieval of user details by unique identifier.
   */
  it('should retrieve user by ID', async () => {
    const user = User.create({ id: 'user-1', email: 'user1@example.com' });
    repository.findById.mockResolvedValue(user);

    const result = await service.getUserById('user-1');
    expect(result.id).toBe('user-1');
    expect(result.email).toBe('user1@example.com');
  });

  /**
   * Verifies that requesting a non-existent user ID throws NotFoundException.
   */
  it('should throw NotFoundException if user ID does not exist', async () => {
    repository.findById.mockResolvedValue(null);

    await expect(service.getUserById('non-existing')).rejects.toThrow(NotFoundException);
  });
});
