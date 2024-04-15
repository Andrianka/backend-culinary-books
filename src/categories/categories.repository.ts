import { EntityRepository } from '@mikro-orm/mysql';
import { wrap } from '@mikro-orm/core';
import { validate } from 'class-validator';
import {
  CategoryBadRequestException,
  CategoryNotFoundException,
} from './exceptions';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

export class CategoriesRepository extends EntityRepository<Category> {
  async getById(id: string): Promise<Category> {
    const recipe = await this.findOne({ id });

    if (!recipe) {
      throw new CategoryNotFoundException();
    }
    return recipe;
  }

  async getByName(name: string): Promise<Category> {
    const recipe = await this.findOne({ name });

    if (!recipe) {
      throw new CategoryNotFoundException();
    }
    return recipe;
  }
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name } = createCategoryDto;
    const category = new Category({ name });

    await this.em.persistAndFlush(category);
    const errors = await validate(category);

    if (errors.length > 0) {
      throw new CategoryBadRequestException('Input data validation failed');
    } else {
      await this.em.persistAndFlush(category);
    }
    return category;
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOneOrFail({ id });
    wrap(category).assign(updateCategoryDto);
    const errors = await validate(category);

    if (errors.length > 0) {
      throw new CategoryBadRequestException('Input data validation failed');
    } else {
      await this.em.persistAndFlush(category);
    }
    return category;
  }

  async removeCategory(id: string) {
    const category = await this.findOneOrFail({ id });
    return this.nativeDelete(category);
  }
}
