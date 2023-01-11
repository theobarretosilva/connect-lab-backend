import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'devices' })
export class DeviceEntity {
  @PrimaryColumn()
  @ManyToOne(() => UserEntity, (user) => user.devices)
  @JoinColumn()
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

  user_id: UserEntity;
}
