import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserModel } from '../infrastructure/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsecaseProxyModule } from 'src/infrastructure/usecase-proxy/usecase-proxy.module';
@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    UsecaseProxyModule.register(),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
