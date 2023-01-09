import { Column, PrimaryGeneratedColumn } from 'typeorm';

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
  user_id: number;
}
