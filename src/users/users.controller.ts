import {
  Body,
  Controller,
  Request,
  HttpStatus,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ChangePasswordDTO } from './dto/changePassword.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/changePassword')
  async changePassword(@Request() request, @Body() body: ChangePasswordDTO) {
    try {
      const authorization = request.headers.authorization;
      const token = authorization.split('Bearer ');
      const payload = this.jwtService.decode(token[1]);
      await this.userService.changePassword(payload, body);
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

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  async getInfoUserProfile(@Request() request) {
    const authorization = request.headers.authorization;
    const token = authorization.split('Bearer ');
    const payload = this.jwtService.decode(token[1]);
    return await this.userService.getUserInfo(payload);
  }
}
