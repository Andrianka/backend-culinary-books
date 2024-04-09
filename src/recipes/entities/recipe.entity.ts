import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../common/BaseEntity.entity';

@Entity()
export class Recipe extends BaseEntity {
  @Property()
  title: string;

  @Property({ length: 1000 })
  description: string;

  @Property()
  approved: boolean;
}
