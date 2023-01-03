import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { UsersController } from './users.controller';
import { userProviders } from './user.providers';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [...databaseProviders, ...userProviders, UsersService],
})
export class UsersModule {}
