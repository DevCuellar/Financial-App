import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { TransactionService } from '../services/transaction.service';
import { sendError, sendSuccess } from '@shared';
import { TransactionDto, CreateTransactionDto, UpdateTransactionDto } from '../dto';

@ApiTags('transactions')
@Controller('transactions')
@UseGuards(AuthGuard)
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @ApiResponse({ status: 200, description: 'Body with the transactions', type: [TransactionDto] })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Get()
  async getTransactions(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = req['user']?.id;
      const response = await this.transactionService.getTransactions(userId);
      return sendSuccess(res, response.data, response.status);
    } catch (error) {
      if (error.response && error.response.data) {
        return sendError(res, error.response.data.errors, error.response.status);
      }
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiResponse({ status: 200, description: 'Body with the transaction', type: TransactionDto })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Get(':id')
  async getTransactionById(@Req() req: Request, @Res() res: Response, @Param('id') id: number) {
    try {
      const userId = req['user']?.id;
      const response = await this.transactionService.getTransactionById(userId, id);
      return sendSuccess(res, response.data, response.status);
    } catch (error) {
      if (error.response && error.response.data) {
        return sendError(res, error.response.data.errors, error.response.status);
      }
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBody({ type: CreateTransactionDto })
  @ApiResponse({ status: 201, description: 'Transaction created.', type: TransactionDto })
  @ApiResponse({ status: 409, description: 'Conflict. Transaction name already exists.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Post()
  async postTransaction(@Res() res: Response, @Body() newTransactionDto: CreateTransactionDto, @Req() req: Request) {
    try {
      const userId = req['user']?.id;
      const response = await this.transactionService.postTransaction(userId, newTransactionDto);
      return sendSuccess(res, response.data, response.status);
    } catch (error) {
      if (error.response && error.response.data) {
        return sendError(res, error.response.data.errors, error.response.status);
      }
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBody({ type: CreateTransactionDto })
  @ApiResponse({ status: 200, description: 'Transaction updated.', type: TransactionDto })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Put(':id')
  async putTransaction(
    @Req() req: Request,
    @Res() res: Response,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Param('id') id: number
  ) {
    try {
      const userId = req['user']?.id;
      const response = await this.transactionService.putTransaction(userId, id, updateTransactionDto);
      return sendSuccess(res, response.data, response.status);
    } catch (error) {
      if (error.response && error.response.data) {
        return sendError(res, error.response.data.errors, error.response.status);
      }
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBody({ type: CreateTransactionDto })
  @ApiResponse({ status: 200, description: 'Transaction deleted.' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Delete(':id')
  async deleteTransaction(@Res() res: Response, @Req() req: Request, @Param('id') id: number) {
    try {
      const userId = req['user']?.id;
      const response = await this.transactionService.deleteTransaction(userId, id);
      return sendSuccess(res, null, response.status);
    } catch (error) {
      if (error.response && error.response.data) {
        return sendError(res, error.response.data.errors, error.response.status);
      }
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
