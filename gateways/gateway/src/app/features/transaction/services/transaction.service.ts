import { Injectable } from '@nestjs/common';
import { TRANSACTION_URL } from '../../../config/base-urls.constants';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { CreateTransactionDto, UpdateTransactionDto } from '../dto';
import { AxiosResponse } from 'axios';

@Injectable()
export class TransactionService {
  constructor(private httpService: HttpService) {}

  async getTransactions(userId: number): Promise<AxiosResponse> {
    const endPoint = `transactions`;
    return await firstValueFrom(this.httpService.get(`${TRANSACTION_URL}${endPoint}/${userId}`));
  }

  async getTransactionById(userId: number, transactionId: number): Promise<AxiosResponse> {
    const endPoint = `transactions`;
    return await firstValueFrom(this.httpService.get(`${TRANSACTION_URL}${endPoint}/${userId}/${transactionId}`));
  }

  async postTransaction(userId: number, createTransactionDto: CreateTransactionDto): Promise<AxiosResponse> {
    const endPoint = `transactions`;
    const data = { ...createTransactionDto, userId };
    return await firstValueFrom(this.httpService.post(`${TRANSACTION_URL}${endPoint}`, data));
  }

  async putTransaction(userId: number, id: number, updateTransactionDto: UpdateTransactionDto): Promise<AxiosResponse> {
    const endPoint = `transactions`;
    return await firstValueFrom(this.httpService.put(`${TRANSACTION_URL}${endPoint}/${userId}/${id}`, updateTransactionDto));
  }

  async deleteTransaction(userId: number, id: number): Promise<AxiosResponse> {
    const endPoint = `transactions`;
    return await firstValueFrom(this.httpService.delete(`${TRANSACTION_URL}${endPoint}/${userId}/${id}`));
  }
}
