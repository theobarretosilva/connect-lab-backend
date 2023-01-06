import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'usersAddress' })
export class UsersAddressEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  zipCode: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  complement: string | null;
}
