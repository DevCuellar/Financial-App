import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { CategoryService } from '../services/category.service';
import { sendError, sendSuccess } from '@shared';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../dto';

@ApiTags('categories')
@Controller('categories')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiResponse({ status: 200, description: 'Body with the categories', type: [CategoryDto] })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Get()
  async getCategories(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = req['user']?.id;
      const response = await this.categoryService.getCategories(userId);
      return sendSuccess(res, response.data, response.status);
    } catch (error) {
      if (error.response && error.response.data) {
        return sendError(res, error.response.data.errors, error.response.status);
      }
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiResponse({ status: 200, description: 'Body with the category', type: CategoryDto })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Get(':id')
  async getCategoryById(@Req() req: Request, @Res() res: Response, @Param('id') id: number) {
    try {
      const userId = req['user']?.id;
      const response = await this.categoryService.getCategoryById(userId, id);
      return sendSuccess(res, response.data, response.status);
    } catch (error) {
      if (error.response && error.response.data) {
        return sendError(res, error.response.data.errors, error.response.status);
      }
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 201, description: 'Category created.', type: CategoryDto })
  @ApiResponse({ status: 409, description: 'Conflict. Category name already exists.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Post()
  async postCategory(@Res() res: Response, @Body() newCategoryDto: CreateCategoryDto, @Req() req: Request) {
    try {
      const userId = req['user']?.id;
      const response = await this.categoryService.postCategory(userId, newCategoryDto);
      return sendSuccess(res, response.data, response.status);
    } catch (error) {
      if (error.response && error.response.data) {
        return sendError(res, error.response.data.errors, error.response.status);
      }
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 200, description: 'Category updated.', type: CategoryDto })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Put(':id')
  async putCategory(
    @Req() req: Request,
    @Res() res: Response,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('id') id: number
  ) {
    try {
      const userId = req['user']?.id;
      const response = await this.categoryService.putCategory(userId, id, updateCategoryDto);
      return sendSuccess(res, response.data, response.status);
    } catch (error) {
      if (error.response && error.response.data) {
        return sendError(res, error.response.data.errors, error.response.status);
      }
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 200, description: 'Category deleted.' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Delete(':id')
  async deleteCategory(@Res() res: Response, @Req() req: Request, @Param('id') id: number) {
    try {
      const userId = req['user']?.id;
      const response = await this.categoryService.deleteCategory(userId, id);
      return sendSuccess(res, response.data, response.status);
    } catch (error) {
      if (error.response && error.response.data) {
        return sendError(res, error.response.data.errors, error.response.status);
      }
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
