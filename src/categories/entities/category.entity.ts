import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../common/BaseEntity.entity';

@Entity()
export class Category extends BaseEntity {
  @Property()
  name: string;

  @Property()
  active: boolean;
}
