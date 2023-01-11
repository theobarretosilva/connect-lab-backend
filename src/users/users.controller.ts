import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { ChangePasswordDTO } from './dto/changePassword.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Post('/changePassword')
  async changePassword(@Request() request, @Body() body: ChangePasswordDTO) {
    try {
      await this.userService.changePassword(
        request.headers.authorization,
        body,
      );
      return {
        message: 'Senha alterada com sucesso!',
      };
    } catch (error) {
      throw new HttpException(
        { reason: 'Alguma informação está incorreta, verifique novamente!' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getInfoUserProfile(@Request() request) {
    try {
      const payload = this.jwtService.decode(request.headers.authorization);
      return await this.userService.getUserInfo(payload);
    } catch (error) {
      console.log(error);
    }
  }
}
