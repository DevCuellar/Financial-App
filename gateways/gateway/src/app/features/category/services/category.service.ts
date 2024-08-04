import { Injectable } from '@nestjs/common';
import { CATEGORY_URL } from '../../../config/base-urls.constants';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';
import { AxiosResponse } from 'axios';

@Injectable()
export class CategoryService {
  constructor(private httpService: HttpService) {}

  async getCategories(userId: number): Promise<AxiosResponse> {
    const endPoint = `categories`;
    return await firstValueFrom(this.httpService.get(`${CATEGORY_URL}${endPoint}/${userId}`));
  }

  async getCategoryById(userId: number, categoryId: number): Promise<AxiosResponse> {
    const endPoint = `categories`;
    return await firstValueFrom(this.httpService.get(`${CATEGORY_URL}${endPoint}/${userId}/${categoryId}`));
  }

  async postCategory(userId: number, createCategoryDto: CreateCategoryDto): Promise<AxiosResponse> {
    const endPoint = `categories`;
    const data = { ...createCategoryDto, userId };
    return await firstValueFrom(this.httpService.post(`${CATEGORY_URL}${endPoint}`, data));
  }

  async putCategory(userId: number, id: number, updateCategoryDto: UpdateCategoryDto): Promise<AxiosResponse> {
    const endPoint = `categories`;
    return await firstValueFrom(this.httpService.put(`${CATEGORY_URL}${endPoint}/${userId}/${id}`, updateCategoryDto));
  }

  async deleteCategory(userId: number, id: number): Promise<AxiosResponse> {
    const endPoint = `categories`;
    return await firstValueFrom(this.httpService.delete(`${CATEGORY_URL}${endPoint}/${userId}/${id}`));
  }
}
