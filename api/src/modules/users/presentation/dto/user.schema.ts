import { z } from 'zod';
import { UserRole } from '@prisma/client';

/**
 * Zod validation schema for creating a user.
 */
export const createUserSchema = z.object({
  email: z.email('Invalid email address'),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  role: z.enum(UserRole).optional().default(UserRole.CLIENT),
});

/**
 * DTO type for creating a user (input payload).
 */
export type CreateUserDto = z.input<typeof createUserSchema>;

/**
 * Zod validation schema for updating a user profile.
 */
export const updateUserSchema = createUserSchema.partial();

/**
 * DTO type for updating a user (input payload).
 */
export type UpdateUserDto = z.input<typeof updateUserSchema>;

/**
 * Zod schema for formatting user responses.
 */
export const userResponseSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  emailVerified: z.boolean(),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  role: z.enum(UserRole),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * DTO type derived from userResponseSchema.
 */
export type UserResponseDto = z.infer<typeof userResponseSchema>;
