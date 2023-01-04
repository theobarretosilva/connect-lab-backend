import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  @Column({ nullable: false })
  zipCode: string;

  @Column({ nullable: false })
  street: string;

  @Column({ nullable: false })
  number: string;

  @Column({ nullable: false })
  neighborhood: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  state: string;

  @Column()
  complement?: string;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
