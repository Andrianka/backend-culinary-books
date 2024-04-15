import { EntityRepository } from '@mikro-orm/mysql';
import { wrap } from '@mikro-orm/core';
import { validate } from 'class-validator';
import { Recipe } from './entities/recipe.entity';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import {
  RecipeBadRequestException,
  RecipeNotFoundException,
} from './exceptions/';
import { RecipeDeleteResponse } from './interfaces/responses/recipeDelete.response';

export class RecipeRepository extends EntityRepository<Recipe> {
  async getById(id: string, filters?): Promise<Recipe> {
    this.getFilter(filters);
    const recipe = await this.findOne(
      { id },
      {
        filters,
      },
    );

    if (!recipe) {
      throw new RecipeNotFoundException();
    }
    return recipe;
  }

  async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const { title, description } = createRecipeDto;
    const recipe = new Recipe({ title, description });
    await this.em.persistAndFlush(recipe);
    const errors = await validate(recipe);

    if (errors.length > 0) {
      throw new RecipeBadRequestException('Input data validation failed');
    } else {
      await this.em.persistAndFlush(recipe);
    }
    return recipe;
  }

  async updateRecipe(
    id: string,
    categoryId: string,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<Recipe> {
    const recipe = await this.findOneOrFail({ id });
    wrap(recipe).assign({ approved: updateRecipeDto.approved, categoryId });
    const errors = await validate(recipe);

    if (errors.length > 0) {
      throw new RecipeBadRequestException('Input data validation failed');
    } else {
      await this.em.persistAndFlush(recipe);
    }
    return recipe;
  }

  async softDelete(id: string): Promise<RecipeDeleteResponse> {
    const recipe = await this.findOneOrFail({ id });
    recipe.deletedAt = new Date();
    await this.em.persistAndFlush(recipe);
    return {
      id,
      deletedAt: recipe.deletedAt,
    };
  }

  async restoreRecipe(id: string) {
    const existingRecipe = await this.getById(id, {
      softDelete: { getOnlyDeleted: true },
    });
    existingRecipe.deletedAt = null;
    await this.em.persistAndFlush(existingRecipe);
    return existingRecipe;
  }

  private getFilter(filters) {
    filters = Object.keys(filters)
      ? {
          softDelete: {},
        }
      : filters;
    return filters;
  }
}
