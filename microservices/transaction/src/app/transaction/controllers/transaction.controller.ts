import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { sendError, sendSuccess } from '@shared';
import { Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { CreateTransactionDto, TransactionDto, UpdateTransactionDto } from '../dto';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get(':userId')
  async getCategories(@Res() res: Response, @Param('userId') userId: number) {
    try {
      const categories = await this.transactionService.getCategories(userId);
      const categoriesDto = plainToInstance(TransactionDto, categories, { excludeExtraneousValues: true });
      return sendSuccess(res, categoriesDto, 200);
    } catch (error) {
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':userId/:id')
  async getTransactionById(@Res() res: Response, @Param() params) {
    try {
      const { userId, id } = params;
      const transaction = await this.transactionService.getTransactionById(userId, id);
      if (transaction) {
        const transactionDto = plainToInstance(TransactionDto, transaction, { excludeExtraneousValues: true });
        return sendSuccess(res, transactionDto, 200);
      }
      return sendError(res, ['Transaction not found'], 404);
    } catch (error) {
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async postTransaction(@Res() res: Response, @Body() createTransactionDto: CreateTransactionDto) {
    try {
      const result = await this.transactionService.postTransaction(createTransactionDto);
      return sendSuccess(res, result, 201);
    } catch (error) {
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':userId/:id')
  async putTransaction(@Res() res: Response, @Body() updateTransactionDto: UpdateTransactionDto, @Param() params) {
    try {
      const { userId, id } = params;
      const result = await this.transactionService.putTransaction(userId, id, updateTransactionDto);
      return sendSuccess(res, result);
    } catch (error) {
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':userId/:id')
  async deleteTransaction(@Res() res: Response, @Param() params) {
    try {
      const { userId, id } = params;
      const result = await this.transactionService.deleteTransaction(userId, id);
      if (result) {
        return sendSuccess(res, result);
      } else {
        return sendError(res, ['Transaction not found'], 404);
      }
    } catch (error) {
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
