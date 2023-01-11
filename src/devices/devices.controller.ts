import {
  Controller,
  UseGuards,
  Post,
  Request,
  Body,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { DeviceDTO } from './device.dto';
import { DevicesService } from './devices.service';

@Controller('devices')
export class DevicesController {
  constructor(
    private deviceService: DevicesService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/addDevice')
  async addDevice(@Body() deviceDTO: DeviceDTO, @Request() request) {
    try {
      const payload = this.jwtService.decode(request.headers.authorization);
      await this.deviceService.addDevice(payload, deviceDTO);
      return {
        message: 'Dispositivo adicionado com sucesso!',
      };
    } catch (error) {
      return {
        message: 'Algo deu errado!',
        cause: error,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/detailDevice/:id')
  async detailDevice(@Param('id') id: string, @Request() request) {
    try {
      const payload = this.jwtService.decode(request.headers.authorization);
      return await this.deviceService.detailDevice(id, payload);
    } catch (error) {}
  }

  @UseGuards(JwtAuthGuard)
  @Get('/allDevices')
  async getAllDevices(@Request() request, @Query('local') local?) {
    try {
      const payload = this.jwtService.decode(request.headers.authorization);
      return await this.deviceService.allDevices(payload, local);
    } catch (error) {}
  }
}
