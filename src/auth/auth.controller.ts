import { Body, Controller, Post } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateUserDTO } from 'src/users/dto/createUser.dto';
import { UserLoginDTO } from 'src/users/dto/userLogin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() userDTO: CreateUserDTO) {
    try {
      await this.authService.signUp(userDTO);
      return {
        message: 'Cadastro realizado',
      };
    } catch (err) {
      if (err.code == 23505) {
        throw new HttpException({ reason: err.detail }, HttpStatus.CONFLICT);
      }
      // if (err.code == 23502) {
      //   throw new HttpException(
      //     { reason: 'Um campo obrigatório não foi preenchido' },
      //     HttpStatus.BAD_REQUEST,
      //   );
      // }
      throw new HttpException({ reason: err }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/signin')
  async signIn(@Body() credentials: UserLoginDTO) {
    return await this.authService.signIn(credentials);
  }
}
