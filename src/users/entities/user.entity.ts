import { Entity, Opt, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../common/BaseEntity.entity';
import { UserRoleType } from '../types';

@Entity()
export class User extends BaseEntity {
  @Property()
  email: string;

  @Property()
  password: string;

  @Property()
  termsAccepted: boolean & Opt = false;

  @Property()
  role: UserRoleType;
}
