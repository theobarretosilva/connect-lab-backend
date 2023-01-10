import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './core/auth/auth.module';
import { authProviders } from './core/auth/auth.providers';
import { JwtStrategy } from './core/auth/guards/jwt.strategy';
import { databaseProviders } from './core/database/database.providers';
import { DeviceEntity } from './devices/device.entity';
import { devicesProviders } from './devices/device.providers';
import { DevicesModule } from './devices/devices.module';
import { UsersAddressEntity } from './users/entities/address.entity';
import { UserEntity } from './users/entities/user.entity';
import { userProviders } from './users/user.providers';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    DevicesModule,
    AuthModule,
    DevicesModule,
  ],
  controllers: [],
  providers: [
    ...databaseProviders,
    ...userProviders,
    ...authProviders,
    ...devicesProviders,
    JwtStrategy,
  ],
})
export class AppModule {}
