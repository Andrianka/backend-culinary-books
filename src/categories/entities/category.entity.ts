import {
  Collection,
  Entity,
  EntityRepositoryType,
  Index,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '../../common/BaseEntity.entity';
import { Recipe } from '../../recipes/entities/recipe.entity';
import { CategoriesRepository } from '../categories.repository';

@Entity({ repository: () => CategoriesRepository })
export class Category extends BaseEntity {
  [EntityRepositoryType]?: CategoriesRepository;

  @Index()
  @Property()
  name: string;

  @Property({ default: true })
  active: boolean;

  @OneToMany(() => Recipe, (recipe) => recipe.category, {
    eager: true,
  })
  recipes = new Collection<Recipe>(this);

  constructor({ name }: { name: string }) {
    super();
    this.name = name;
  }
}
