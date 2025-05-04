import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';
import { ROLE } from '../shared/enums/roles.enum';

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
    type: 'enum',
    enum: ROLE,
    default: ROLE.USER,
  })
  role: ROLE;

  @Column({
    type: 'boolean',
    default: false,
  })
  status: boolean;
}
