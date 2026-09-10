import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse } from '@nestjs/swagger';
import { UserService } from '../../application/services/user.service';
import type { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dto/user.schema';
import { ApiResponse } from '@/modules/shared/responses/api-response';

/**
 * Controller exposing User management REST API endpoints.
 */
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Endpoint for creating a new user account.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user account' })
  @SwaggerResponse({
    status: HttpStatus.CREATED,
    description: 'User account successfully created.',
  })
  async create(@Body() dto: CreateUserDto): Promise<ApiResponse<UserResponseDto>> {
    const data = await this.userService.createUser(dto);
    return ApiResponse.success(data);
  }

  /**
   * Endpoint for retrieving all users.
   */
  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @SwaggerResponse({ status: HttpStatus.OK, description: 'Users list successfully retrieved.' })
  async findAll(): Promise<UserResponseDto[]> {
    return this.userService.getAllUsers();
  }

  /**
   * Endpoint for retrieving a specific user by identifier.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve user details by ID' })
  @SwaggerResponse({ status: HttpStatus.OK, description: 'User details found.' })
  @SwaggerResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.getUserById(id);
  }

  /**
   * Endpoint for updating a user profile.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update user profile details' })
  @SwaggerResponse({ status: HttpStatus.OK, description: 'User profile successfully updated.' })
  @SwaggerResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<UserResponseDto> {
    return this.userService.updateUser(id, dto);
  }

  /**
   * Endpoint for removing a user account.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user account by ID' })
  @SwaggerResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User account successfully deleted.',
  })
  @SwaggerResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUser(id);
  }
}
