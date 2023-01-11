import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { DevicesController } from './devices.controller';
import { devicesProviders } from './device.providers';
import { DevicesService } from './devices.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [DevicesController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 60,
      },
    }),
  ],
  providers: [...databaseProviders, ...devicesProviders, DevicesService],
})
export class DevicesModule {}
