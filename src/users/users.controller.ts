import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async insert(@Body() user: CreateUserDTO): Promise<UserEntity> {
    try {
      return await this.userService.signUp(user);
    } catch (err) {
      if (err.code == 23505) {
        throw new HttpException({ reason: err.detail }, HttpStatus.CONFLICT);
      }
      if (err.code == 23502) {
        throw new HttpException(
          { reason: 'Um campo obrigatório não foi preenchido' },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException({ reason: err }, HttpStatus.BAD_REQUEST);
    }
  }
}
