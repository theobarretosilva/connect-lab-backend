import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { databaseProviders } from 'src/core/database/database.providers';
import { userProviders } from 'src/users/user.providers';
import { AuthService } from './auth.service';

@Module({
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
