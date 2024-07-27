import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NewCategoryDto } from '../dto/new-category.dto';
import { Response, Request } from 'express';
import { CategoryService } from '../services/category.service';
import { sendError, sendSuccess } from '@shared';
import { CategoryResponseDto } from '../dto/category-response.dto';

@ApiTags('categories')
@Controller('categories')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiResponse({ status: 200, description: 'Body with the category', type: CategoryResponseDto })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Get(':id')
  async getCategoryById(@Res() res: Response, @Param('id') id: number) {
    try {
      const response = await this.categoryService.getCategoryById(id);
      return sendSuccess(res, response.data, response.status);
    } catch (error) {
      if (error.response && error.response.data) {
        return sendError(
          res,
          error.response.data.errors,
          error.response.status
        );
      }
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBody({ type: NewCategoryDto })
  @ApiResponse({ status: 201, description: 'Category created.', type: CategoryResponseDto })
  @ApiResponse({ status: 409, description: 'Conflict. Category name already exists.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Post()
  async postCategory(
    @Res() res: Response,
    @Body() newCategoryDto: NewCategoryDto,
    @Req() req: Request  ) {
    try {
      const userId = req["user"]?.id;
      const response = await this.categoryService.postCategory(newCategoryDto, userId);
      return sendSuccess(res, response.data, response.status);
    } catch (error) {
      if (error.response && error.response.data) {
        return sendError(
          res,
          error.response.data.errors,
          error.response.status
        );
      }
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
