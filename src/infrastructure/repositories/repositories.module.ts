import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../models/user.model';
import { UserRepositorySequelize } from './user.repository.impl.sequelize';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  providers: [UserRepositorySequelize],
  exports: [UserRepositorySequelize],
})
export class RepositoriesModule {}
