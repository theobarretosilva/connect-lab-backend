import { Controller, UseGuards, Post, Request, Body } from '@nestjs/common';
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

  // @UseGuards(JwtAuthGuard)
  @Post()
  async addDevice(@Request() request, @Body() body: DeviceDTO) {
    try {
      await this.deviceService.addDevice(request.headers.authorization, body);
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
}
