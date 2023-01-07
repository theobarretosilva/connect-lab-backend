import { Inject, Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/utils/jwtPayload.utils';
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

  async changePassword(
    userPayload: JwtPayload,
    changePasswordDTO: ChangePasswordDTO,
  ) {
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
        await this.userRepository.save(foundUser);
      }
    });
  }

  async getUserInfo(userPayload: JwtPayload) {
    const foundUser = await this.userRepository.findOne({
      where: {
        _id: userPayload.id,
      },
    });
    const foundAddress = await this.addressRepository.findOne({
      where: {
        _id: foundUser.address,
      },
    });

    const firstName = foundUser.fullName.split(' ');

    if (foundUser.phone == null) {
      return {
        photoUrl: foundUser.photoUrl,
        userName: firstName,
        email: foundUser.email,
      };
    } else {
      return {
        photoUrl: foundUser.photoUrl,
        userName: firstName,
        email: foundUser.email,
        phone: foundUser.phone,
        address: foundAddress,
      };
    }
  }
}
