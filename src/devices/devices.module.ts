import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { DevicesController } from './devices.controller';
import { devicesProviders } from './device.providers';
import { DevicesService } from './devices.service';

@Module({
  controllers: [DevicesController],
  providers: [...databaseProviders, ...devicesProviders, DevicesService],
})
export class DevicesModule {}
