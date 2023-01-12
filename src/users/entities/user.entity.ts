import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersAddressEntity } from './address.entity';
import { DeviceEntity } from 'src/devices/device.entity';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  _id: string;

  @Column({ nullable: false })
  fullName: string;

  @Column()
  photoUrl: string | null;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ nullable: true })
  phone: string | null;

  @OneToOne(() => UsersAddressEntity)
  @JoinColumn()
  address: UsersAddressEntity;

  @OneToMany(() => DeviceEntity, (device) => device._id)
  @JoinColumn()
  devices: DeviceEntity;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
