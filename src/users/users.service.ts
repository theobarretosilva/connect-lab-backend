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
    return new Promise(async (resolve) => {
      const { email, oldPassword, newPassword } = changePasswordDTO;

      const foundUser = await this.userRepository.findOne({
        where: {
          _id: userPayload.id,
        },
      });

      const hashPassword = bcrypt.hash(newPassword, foundUser.salt);

      if (
        foundUser.email == email &&
        (await foundUser.checkPassword(oldPassword))
      ) {
        foundUser.password = hashPassword;
        const savePassword = await this.userRepository.save(foundUser);
        resolve(savePassword);
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
