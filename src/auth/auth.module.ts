import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { databaseProviders } from 'src/core/database/database.providers';
import { userProviders } from 'src/users/user.providers';
import { AuthController } from './auth.controller';
import { authProviders } from './auth.providers';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 60,
      },
    }),
  ],
  providers: [...databaseProviders, ...userProviders, AuthService],
})
export class AuthModule {}
