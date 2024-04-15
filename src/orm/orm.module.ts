import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '../config/mysqlConfig';
import { User } from '../users/entities/user.entity';
import { Recipe } from '../recipes/entities/recipe.entity';
import { Category } from '../categories/entities/category.entity';
import { Media } from '../medias/entities/media.entity';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    MikroOrmModule.forFeature({
      entities: [User, Category, Recipe, Media],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
