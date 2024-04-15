import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../common/BaseEntity.entity';
import { FileStorageType } from '../types';
import { Recipe } from '../../recipes/entities/recipe.entity';

@Entity()
export class Media extends BaseEntity {
  @Property()
  public name: string;

  @Property()
  public path: string;

  @Property({ default: 0, type: 'bigint' })
  public size: number;

  @Property({})
  public storage: FileStorageType;

  @Property({ name: 'mime_type', nullable: true })
  public mimeType?: string;

  @ManyToOne()
  recipe: Recipe;
}
