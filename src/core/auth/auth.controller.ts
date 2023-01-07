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
    if (await this.authService.findOne(userDTO.email)) {
      throw new HttpException(
        { reason: 'Usuário já cadastrado!' },
        HttpStatus.CONFLICT,
      );
    } else {
      await this.authService.signUp(userDTO, userDTO.address);
      return {
        message: 'Usuário cadastrado com sucesso!',
      };
    }
  }

  @Post('/signin')
  async signIn(@Body() credentials: UserLoginDTO) {
    return await this.authService.signIn(credentials);
  }
}
