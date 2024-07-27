import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewCategoryDto } from '../dto/new-category.dto';
import { CategoryResponseDto } from '../dto/category-response.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async getCategoryById(id: number): Promise<CategoryResponseDto | null> {
    const category = this.categoryRepository.findOne({ where: { id: id } });
    return category;
  }
  
  async postCategory(category: NewCategoryDto): Promise<CategoryResponseDto | null> {
    const newCategory = this.categoryRepository.create(category);
    const result = await this.categoryRepository.save(newCategory);
    return await this.getCategoryById(result.id);
  }
}
