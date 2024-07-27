import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NewCategoryDto } from '../dto/new-category.dto';
import { CATEGORY_URL } from '../../../config/base-urls.constants';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CategoryService {
  constructor(private httpService: HttpService) {}

  async getCategoryById(id: number) {
    const endPoint = `categories`;
    return await firstValueFrom(
      this.httpService.get(`${CATEGORY_URL}${endPoint}/${id}`)
    );
  }

  async postCategory(newCategoryDto: NewCategoryDto, userId: number) {
    if (newCategoryDto.userId !== userId) {
      throw new HttpException('User ID does not match ' + userId, HttpStatus.FORBIDDEN); 
    }

    const endPoint = `categories`;
    return await firstValueFrom(
      this.httpService.post(`${CATEGORY_URL}${endPoint}`, newCategoryDto)
    );
  }
}
