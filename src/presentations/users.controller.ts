import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from '../presentations/dto/create-user.dto';
import { CreateUserUseCase } from 'src/application/use-cases/create-user.use-case';
import { FindAllUsersUseCase } from 'src/application/use-cases/find-all-users.use-case';
import { FindOneUserUseCase } from 'src/application/use-cases/find-one-user.use-case';
import { UsecaseProxyModule } from 'src/infrastructure/usecase-proxy/usecase-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecase-proxy/usecase-proxy';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsecaseProxyModule.CREATE_USER_USE_CASE)
    private readonly createUserUseCaseProxy: UseCaseProxy<CreateUserUseCase>,
    @Inject(UsecaseProxyModule.FIND_ALL_USERS_USE_CASE)
    private readonly findAllUsersUseCaseProxy: UseCaseProxy<FindAllUsersUseCase>,
    @Inject(UsecaseProxyModule.FIND_USER_USE_CASE)
    private readonly findOneUserUseCaseProxy: UseCaseProxy<FindOneUserUseCase>,
    @Inject(UsecaseProxyModule.DELETE_USER_USE_CASE)
    private readonly deleteUserUseCaseProxy: UseCaseProxy<FindOneUserUseCase>,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCaseProxy.getInstance().execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.findAllUsersUseCaseProxy.getInstance().execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneUserUseCaseProxy.getInstance().execute(id);
  }

  @Delete(':id')
  delete(@Param('id') id: any) {
    return this.deleteUserUseCaseProxy.getInstance().execute(id);
  }
}
