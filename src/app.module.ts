import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './presentations/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './infrastructure/config/db.config';

@Module({
  imports: [SequelizeModule.forRoot(sequelizeConfig), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
