import {
  Entity,
  EntityRepositoryType,
  Index,
  Opt,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '../../common/BaseEntity.entity';
import { UserRole, UserRoleType } from '../types';
import { UserRepository } from '../users.repository';
import { Exclude } from 'class-transformer';

@Entity({ repository: () => UserRepository })
export class User extends BaseEntity {
  [EntityRepositoryType]?: UserRepository;

  @Property({ unique: true })
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property()
  termsAccepted: boolean & Opt = false;

  @Property({ default: UserRole.USER })
  role: UserRoleType;

  @Index()
  @Property({ nullable: true, type: 'timestamptz' })
  deletedAt?: Date;

  @Property()
  @Exclude()
  public refreshHashToken?: string;
}
