import { DynamicModule, Module } from '@nestjs/common';
import { UserRepositorySequelize } from 'src/infrastructure/repositories/user.repository.impl.sequelize';
import { UseCaseProxy } from './usecase-proxy';
import { CreateUserUseCase } from 'src/application/use-cases/create-user.use-case';
import { FindAllUsersUseCase } from 'src/application/use-cases/find-all-users.use-case';
import { FindOneUserUseCase } from 'src/application/use-cases/find-one-user.use-case';
import { DeleteUserUseCase } from 'src/application/use-cases/delete-user.use-case';
import { RepositoriesModule } from '../repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
})
export class UsecaseProxyModule {
  //USER
  static FIND_ALL_USERS_USE_CASE = 'getAllUsersUsecaseProxy';
  static CREATE_USER_USE_CASE = 'createUserUsecaseProxy';
  static FIND_USER_USE_CASE = 'findUserUsecaseProxy';
  static DELETE_USER_USE_CASE = 'deleteUserUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [UserRepositorySequelize],
          provide: UsecaseProxyModule.CREATE_USER_USE_CASE,
          useFactory: (userRepository: UserRepositorySequelize) =>
            new UseCaseProxy(new CreateUserUseCase(userRepository)),
        },
        {
          inject: [UserRepositorySequelize],
          provide: UsecaseProxyModule.FIND_ALL_USERS_USE_CASE,
          useFactory: (userRepository: UserRepositorySequelize) =>
            new UseCaseProxy(new FindAllUsersUseCase(userRepository)),
        },
        {
          inject: [UserRepositorySequelize],
          provide: UsecaseProxyModule.FIND_USER_USE_CASE,
          useFactory: (userRepository: UserRepositorySequelize) =>
            new UseCaseProxy(new FindOneUserUseCase(userRepository)),
        },
        {
          inject: [UserRepositorySequelize],
          provide: UsecaseProxyModule.DELETE_USER_USE_CASE,
          useFactory: (userRepository: UserRepositorySequelize) =>
            new UseCaseProxy(new DeleteUserUseCase(userRepository)),
        },
      ],
      exports: [
        UsecaseProxyModule.FIND_ALL_USERS_USE_CASE,
        UsecaseProxyModule.CREATE_USER_USE_CASE,
        UsecaseProxyModule.FIND_USER_USE_CASE,
      ],
    };
  }
}
