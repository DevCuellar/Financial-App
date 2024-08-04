import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { sendError, sendSuccess } from '@shared';
import { Response } from 'express';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../dto';
import { plainToInstance } from 'class-transformer';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get(':userId')
  async getCategories(@Res() res: Response, @Param('userId') userId: number) {
    try {
      const categories = await this.categoryService.getCategories(userId);
      const categoriesDto = plainToInstance(CategoryDto, categories, { excludeExtraneousValues: true });
      return sendSuccess(res, categoriesDto, 200);
    } catch (error) {
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':userId/:id')
  async getCategoryById(@Res() res: Response, @Param() params) {
    try {
      const { userId, id } = params;
      const category = await this.categoryService.getCategoryById(userId, id);
      if (category) {
        const categoryDto = plainToInstance(CategoryDto, category, { excludeExtraneousValues: true });
        return sendSuccess(res, categoryDto, 200);
      }
      return sendError(res, ['Category not found'], 404);
    } catch (error) {
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async postCategory(@Res() res: Response, @Body() createCategoryDto: CreateCategoryDto) {
    try {
      const result = await this.categoryService.postCategory(createCategoryDto);
      return sendSuccess(res, result, 201);
    } catch (error) {
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':userId/:id')
  async putCategory(@Res() res: Response, @Body() updateCategoryDto: UpdateCategoryDto, @Param() params) {
    try {
      const { userId, id } = params;
      const result = await this.categoryService.putCategory(userId, id, updateCategoryDto);
      return sendSuccess(res, result);
    } catch (error) {
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':userId/:id')
  async deleteCategory(@Res() res: Response, @Param() params) {
    try {
      const { userId, id } = params;
      const result = await this.categoryService.deleteCategory(userId, id);
      if (result) {
        return sendSuccess(res, result);
      } else {
        return sendError(res, ['Category not found'], 404);
      }
    } catch (error) {
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
