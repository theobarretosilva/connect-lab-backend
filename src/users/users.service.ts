import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChangePasswordDTO } from './dto/changePassword.dto';
import { UsersAddressEntity } from './entities/address.entity';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: Repository<UserEntity>,
    @Inject('USERSADDRESS_REPOSITORY')
    private addressRepository: Repository<UsersAddressEntity>,
  ) {}

  async changePassword(userPayload: any, changePasswordDTO: ChangePasswordDTO) {
    return new Promise(async (resolve, reject) => {
      const { email, oldPassword, newPassword } = changePasswordDTO;

      const foundUser = await this.userRepository.findOne({
        where: {
          _id: userPayload.id,
        },
      });

      const hashPassword = await bcrypt.hash(newPassword, foundUser.salt);

      if (
        foundUser.email == email &&
        (await foundUser.checkPassword(oldPassword))
      ) {
        const changePassword = await this.userRepository.update(
          {
            _id: userPayload.id,
          },
          {
            password: hashPassword,
          },
        );
        resolve(changePassword);
      } else if (
        foundUser.email != email ||
        !(await foundUser.checkPassword(oldPassword))
      ) {
        reject('Algo não foi preenchido corretamente!');
      }
    });
  }

  async getUserInfo(userPayload: any) {
    const foundUser = await this.userRepository.findOne({
      where: {
        email: userPayload.email,
      },
      relations: {
        address: true,
      },
    });

    if (foundUser.phone == null) {
      return {
        photoUrl: foundUser.photoUrl,
        userName: foundUser.fullName,
        email: foundUser.email,
        address: foundUser.address,
      };
    } else {
      return {
        photoUrl: foundUser.photoUrl,
        userName: foundUser.fullName,
        email: foundUser.email,
        phone: foundUser.phone,
        address: foundUser.address,
      };
    }
  }
}
