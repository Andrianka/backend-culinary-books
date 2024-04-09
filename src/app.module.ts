import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { RecipesModule } from './recipes/recipes.module';
import { MediasModule } from './medias/medias.module';
import { OrmModule } from './orm/orm.module';

@Module({
  imports: [
    OrmModule,
    UsersModule,
    CategoriesModule,
    RecipesModule,
    MediasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
