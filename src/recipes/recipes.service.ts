import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeRepository } from './recipes.repository';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class RecipesService {
  constructor(
    private readonly recipeRepository: RecipeRepository,
    private readonly categoryService: CategoriesService,
  ) {}

  create(createRecipeDto: CreateRecipeDto) {
    return this.recipeRepository.createRecipe(createRecipeDto);
  }

  findAll() {
    return this.recipeRepository.findAll();
  }

  findOne(id: string) {
    return this.recipeRepository.getById(id);
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    const category = await this.categoryService.findByNameOrCreate(
      updateRecipeDto.categoryName,
    );
    return this.recipeRepository.updateRecipe(id, category.id, updateRecipeDto);
  }

  softDelete(id: string) {
    return this.recipeRepository.softDelete(id);
  }
}
