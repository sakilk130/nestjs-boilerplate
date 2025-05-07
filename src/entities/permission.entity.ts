import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('permissions')
export class Permission extends BaseEntity {
  @Column({
    unique: true,
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  description: string;

  @Column({ default: true, type: 'boolean' })
  status: boolean;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  module_name: string;
}
