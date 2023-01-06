import { DataSource } from 'typeorm/data-source';
import { UsersAddressEntity } from './entities/address.entity';
import { UserEntity } from './entities/user.entity';

export const userProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'USERSADDRESS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UsersAddressEntity),
    inject: ['DATA_SOURCE'],
  },
];
