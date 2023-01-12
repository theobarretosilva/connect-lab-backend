import {
  Controller,
  Post,
  Request,
  Body,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DeviceDTO } from './device.dto';
import { DevicesService } from './devices.service';

@Controller('devices')
export class DevicesController {
  constructor(
    private deviceService: DevicesService,
    private jwtService: JwtService,
  ) {}

  @Post('/addDevice')
  async addDevice(@Body() deviceDTO: DeviceDTO, @Request() request) {
    if (await this.deviceService.findOne(deviceDTO._id)) {
      return {
        message: 'Um dispositivo com esse _id já foi cadastrado!',
      };
    } else {
      const payload = this.jwtService.decode(request.headers.authorization);
      await this.deviceService.addDevice(payload, deviceDTO);
      return {
        message: 'Dispositivo adicionado com sucesso!',
      };
    }
  }

  @Get('/detailDevice/:id')
  async detailDevice(@Param('id') id: number, @Request() request) {
    try {
      const payload = this.jwtService.decode(request.headers.authorization);
      return await this.deviceService.detailDevice(id, payload);
    } catch (error) {}
  }

  @Get('/allDevices')
  async getAllDevices(@Request() request, @Query('local') local?) {
    try {
      const payload = this.jwtService.decode(request.headers.authorization);
      return await this.deviceService.allDevices(payload, local);
    } catch (error) {}
  }
}
