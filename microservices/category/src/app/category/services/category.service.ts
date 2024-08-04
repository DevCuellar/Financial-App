import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async getCategories(userId: number): Promise<CategoryDto[] | null> {
    const categories = this.categoryRepository.find({ where: { userId } });
    return categories;
  }

  async getCategoryById(userId: number, id: number): Promise<CategoryDto | null> {
    const category = this.categoryRepository.findOne({ where: { userId, id } });
    return category;
  }

  async postCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryDto | null> {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    const result = await this.categoryRepository.save(newCategory);
    return await this.getCategoryById(createCategoryDto.userId, result.id);
  }

  async putCategory(userId: number, id: number, category: UpdateCategoryDto): Promise<CategoryDto | null> {
    const updated = this.categoryRepository.create(category);
    await this.categoryRepository.update({ userId, id }, updated);
    return await this.getCategoryById(userId, id);
  }

  async deleteCategory(userId: number, id: number): Promise<boolean> {
    const result = await this.categoryRepository.delete({ userId, id });
    return result.affected > 0;
  }
}
