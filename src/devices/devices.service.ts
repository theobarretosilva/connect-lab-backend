import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DeviceDTO } from './device.dto';
import { DeviceEntity } from './device.entity';

@Injectable()
export class DevicesService {
  constructor(
    @Inject('DEVICES_REPOSITORY')
    private deviceRepository: Repository<DeviceEntity>,
  ) {}

  async addDevice(userPayload: any, deviceDTO: DeviceDTO) {
    return new Promise(async (resolve) => {
      const { name, type, madeBy, isOn, info, ipAddress, macAddress, local } =
        deviceDTO;
      const device = this.deviceRepository.create();
      
    });
  }
}
