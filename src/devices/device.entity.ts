import { UserEntity } from 'src/users/entities/user.entity';
import { text } from 'stream/consumers';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { JoinTable } from 'typeorm/decorator/relations/JoinTable';

@Entity({ name: 'devices' })
export class DeviceEntity {
  @PrimaryColumn()
  _id: number;

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

  @ManyToOne(() => UserEntity)
  @JoinTable()
  user_id: UserEntity;
}
