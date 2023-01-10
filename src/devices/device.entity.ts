import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'devices' })
export class DeviceEntity {
  @PrimaryGeneratedColumn()
  _id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  madeBy: string;

  @Column({ nullable: false, type: 'boolean' })
  isOn: boolean;

  @Column({ nullable: false })
  info: string;

  @Column({ nullable: false })
  ipAddress: string;

  @Column({ nullable: false })
  macAddress: string;

  @Column({ nullable: false })
  local: string;

  @Column({ nullable: false })
  grouping: string;

  @ManyToOne(() => UserEntity, (user) => user.devices)
  @JoinColumn()
  user_id: UserEntity;
}
