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
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { ChangePasswordDTO } from './dto/changePassword.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/changePassword')
  async changePassword(@Request() request, @Body() body: ChangePasswordDTO) {
    console.log(request.user);
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
    return await this.userService.getUserInfo(request.headers.authorization);
    // } catch (error) {
    //   throw new HttpException({ reason: error }, HttpStatus.);
    // }
  }
}
