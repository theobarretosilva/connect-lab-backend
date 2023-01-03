import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async signUp(user: CreateUserDTO): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.userRepository.insert(user);
        const { id } = response.generatedMaps[0];
        // eslint-disable-next-line prefer-const
        let created = new UserEntity();
        // created = { ...user, _id: id };
        resolve(created);
        resolve(null);
      } catch (error: any) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }
}
