import { Module } from '@nestjs/common';
import { PrismaModule } from '@/infrastructure/prisma/prisma.module';
import { UserRepository } from './domain/repositories/user.repository';
import { PrismaUserRepository } from './infrastructure/persistence/prisma/prisma-user.repository';
import { UserMapper } from './infrastructure/persistence/prisma/mappers/user.mapper';
import { UserDtoMapper } from './application/mappers/user-dto.mapper';
import { UserService } from './application/services/user.service';
import { UserController } from './presentation/controllers/user.controller';

/**
 * Users module encapsulating Domain, Infrastructure, Application and Presentation layers.
 */
@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserMapper,
    UserDtoMapper,
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserService, UserRepository, UserDtoMapper],
})
export class UsersModule {}
