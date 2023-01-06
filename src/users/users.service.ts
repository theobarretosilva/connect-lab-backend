import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersAddressEntity } from './entities/address.entity';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: Repository<UserEntity>,
    @Inject('USERSADDRESS_REPOSITORY')
    private addressRepository: Repository<UsersAddressEntity>,
  ) {}
}
