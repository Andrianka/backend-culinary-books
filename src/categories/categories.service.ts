import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoriesRepository) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.createCategory(createCategoryDto);
  }

  findAll() {
    return this.categoryRepository.findAll();
  }

  findOne(id: string) {
    return this.categoryRepository.getById(id);
  }

  async findByNameOrCreate(name: string) {
    let category = await this.categoryRepository.getByName(name);
    if (!category) {
      category = await this.categoryRepository.createCategory({ name });
    }
    return category;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.updateCategory(id, updateCategoryDto);
  }

  remove(id: string) {
    return this.categoryRepository.removeCategory(id);
  }
}
