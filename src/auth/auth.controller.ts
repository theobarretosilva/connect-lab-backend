import { Body, Controller, Post, Get, Headers } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/createUser.dto';
import { UserLoginDTO } from 'src/users/dto/userLogin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('token')
  async verifyToken(@Headers('authorization') token: string) {
    return await this.authService.validateToken(token);
  }

  @Post('/signUp')
  async signUp(@Body() userDTO: CreateUserDTO) {
    const userCreated = await this.authService.signUp(userDTO);
    if (userCreated) {
      return {
        message: 'Cadastro realizado',
      };
    }
  }

  @Post('/signIn')
  async signIn(@Body() credentials: UserLoginDTO) {
    return await this.authService.signIn(credentials);
  }
}
