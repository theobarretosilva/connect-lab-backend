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
      const {
        _id,
        name,
        type,
        madeBy,
        isOn,
        info,
        ipAddress,
        macAddress,
        local,
        grouping,
      } = deviceDTO;
      const device = this.deviceRepository.create();
      device._id = _id;
      device.name = name;
      device.type = type;
      device.madeBy = madeBy;
      device.isOn = isOn;
      device.info = info;
      device.ipAddress = ipAddress;
      device.macAddress = macAddress;
      device.local = local;
      device.grouping = grouping;
      device.user_id = userPayload.id;
      const deviceCreated = this.deviceRepository.save(device);
      resolve(deviceCreated);
    });
  }
}
