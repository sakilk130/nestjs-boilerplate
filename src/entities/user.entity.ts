import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Role } from './roles.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  avatar: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  address: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  status: boolean;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];
}
