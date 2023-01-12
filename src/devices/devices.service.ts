import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { DeviceDTO } from './device.dto';
import { DeviceEntity } from './device.entity';

@Injectable()
export class DevicesService {
  constructor(
    @Inject('DEVICES_REPOSITORY')
    private deviceRepository: Repository<DeviceEntity>,
    @Inject('USERS_REPOSITORY')
    private userRepository: Repository<UserEntity>,
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

  async detailDevice(idDevice: number, userPayload: any) {
    const foundDevice = await this.deviceRepository.findOne({
      where: {
        _id: idDevice,
        user_id: userPayload.id,
      },
    });

    delete foundDevice._id;
    delete foundDevice.grouping;
    delete foundDevice.local;
    delete foundDevice.user_id;

    return foundDevice;
  }

  async allDevices(userPayload: any, local?: string) {
    const foundDevices = await this.deviceRepository.find({
      where: {
        user_id: userPayload.id,
      },
    });

    if (local) {
      return foundDevices.filter((value) => {
        return value.local.toLowerCase().includes(local);
      });
    } else {
      return foundDevices;
    }
  }
}
