import { ApiProperty } from '@nestjs/swagger';
import { SimpleRecipeResponse } from './simpleRecipe.response';
import { Media } from '../../../medias/entities/media.entity';
import { Category } from '../../../categories/entities/category.entity';

export class RecipeResponse extends SimpleRecipeResponse {
  @ApiProperty({ example: [] })
  public medias: Media[];

  @ApiProperty({ example: 'Category name' })
  public category: Category;
}
