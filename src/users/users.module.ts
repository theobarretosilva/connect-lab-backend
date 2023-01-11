import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { UsersController } from './users.controller';
import { userProviders } from './user.providers';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/core/auth/guards/jwt.strategy';

@Module({
  controllers: [UsersController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 60,
      },
    }),
  ],
  providers: [
    ...databaseProviders,
    ...userProviders,
    UsersService,
    JwtStrategy,
  ],
})
export class UsersModule {}
