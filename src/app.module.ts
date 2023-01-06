import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { authProviders } from './auth/auth.providers';
import { JwtStrategy } from './auth/guards/jwt.strategy';
import { databaseProviders } from './core/database/database.providers';
import { DevicesModule } from './devices/devices.module';
import { userProviders } from './users/user.providers';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 60 },
    }),
    UsersModule,
    DevicesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    ...databaseProviders,
    ...userProviders,
    ...authProviders,
    JwtStrategy,
  ],
})
export class AppModule {}
