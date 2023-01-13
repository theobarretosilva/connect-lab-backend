import {
  Controller,
  Post,
  Request,
  Body,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { DeviceDTO } from './device.dto';
import { DevicesService } from './devices.service';

@Controller('devices')
export class DevicesController {
  constructor(
    private deviceService: DevicesService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/addDevice')
  async addDevice(@Body() deviceDTO: DeviceDTO, @Request() request) {
    if (await this.deviceService.findOne(deviceDTO._id)) {
      return {
        message: 'Um dispositivo com esse _id já foi cadastrado!',
      };
    } else {
      const authorization = request.headers.authorization;
      const token = authorization.split('Bearer ');
      const payload = this.jwtService.decode(token[1]);
      await this.deviceService.addDevice(payload, deviceDTO);
      return {
        message: 'Dispositivo adicionado com sucesso!',
      };
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/detailDevice/:id')
  async detailDevice(@Param('id') id: number, @Request() request) {
    const authorization = request.headers.authorization;
    const token = authorization.split('Bearer ');
    const payload = this.jwtService.decode(token[1]);
    return await this.deviceService.detailDevice(id, payload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/allDevices')
  async getAllDevices(@Request() request, @Query('local') local?) {
    const authorization = request.headers.authorization;
    const token = authorization.split('Bearer ');
    const payload = this.jwtService.decode(token[1]);
    return await this.deviceService.allDevices(payload, local);
  }
}
