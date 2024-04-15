import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { CategoriesModule } from '../categories/categories.module';
import { OrmModule } from '../orm/orm.module';

@Module({
  imports: [OrmModule, CategoriesModule],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
