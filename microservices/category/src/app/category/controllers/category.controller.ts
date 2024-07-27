import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { NewCategoryDto } from '../dto/new-category.dto';
import { CategoryService } from '../services/category.service';
import { sendError, sendSuccess } from '@shared';
import { Response } from 'express';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get(':id')
  async getCategoryById(@Res() res: Response, @Param('id') id: number) {
    try {
      const category = await this.categoryService.getCategoryById(id);
      if (category) {
        return sendSuccess(res, category, 200);
      }
      return sendError(res, ['Category not found'], 404);
    } catch (error) {
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async postCategory(
    @Res() res: Response,
    @Body() newCategory: NewCategoryDto
  ) {
    try {
      const category = await this.categoryService.postCategory(newCategory);
      return sendSuccess(res, category, 201);
    } catch (error) {
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
