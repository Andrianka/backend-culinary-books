import {
  Collection,
  Entity,
  EntityRepositoryType,
  Index,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '../../common/BaseEntity.entity';
import { Media } from '../../medias/entities/media.entity';
import { Category } from '../../categories/entities/category.entity';
import { RecipeRepository } from '../recipes.repository';

@Entity({ repository: () => RecipeRepository })
export class Recipe extends BaseEntity {
  [EntityRepositoryType]?: RecipeRepository;

  @Index()
  @Property()
  title: string;

  @Property({ length: 1000 })
  description: string;

  @Property()
  approved: boolean;

  @Index()
  @Property()
  categoryId: string;

  @Index()
  @Property({ nullable: true, type: 'timestamptz' })
  deletedAt?: Date;

  @OneToMany(() => Media, (media) => media.recipe, {
    eager: true,
    orphanRemoval: true,
  })
  medias = new Collection<Media>(this);

  @ManyToOne({ deleteRule: 'set null' })
  category: Category;

  constructor({ title, description }: { title: string; description: string }) {
    super();
    this.title = title;
    this.description = description;
  }
}
