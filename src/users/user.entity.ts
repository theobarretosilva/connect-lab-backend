import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AddressDTO } from './dto/address.dto';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ nullable: false })
  fullName: string;

  @Column()
  photoUrl?: string | null;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  phone?: string;

  @OneToOne(() => AddressDTO, { cascade: true })
  @JoinColumn({ name: 'address' })
  address: AddressDTO;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
