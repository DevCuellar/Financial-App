import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionDto, CreateTransactionDto, UpdateTransactionDto } from '../dto';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>
  ) {}

  async getCategories(userId: number): Promise<TransactionDto[] | null> {
    const categories = this.transactionRepository.find({ where: { userId } });
    return categories;
  }

  async getTransactionById(userId: number, id: number): Promise<TransactionDto | null> {
    const transaction = this.transactionRepository.findOne({ where: { userId, id } });
    return transaction;
  }

  async postTransaction(createTransactionDto: CreateTransactionDto): Promise<TransactionDto | null> {
    const newTransaction = this.transactionRepository.create(createTransactionDto);
    const result = await this.transactionRepository.save(newTransaction);
    return await this.getTransactionById(createTransactionDto.userId, result.id);
  }

  async putTransaction(userId: number, id: number, transaction: UpdateTransactionDto): Promise<TransactionDto | null> {
    const updated = this.transactionRepository.create(transaction);
    await this.transactionRepository.update({ userId, id }, updated);
    return await this.getTransactionById(userId, id);
  }

  async deleteTransaction(userId: number, id: number): Promise<boolean> {
    const result = await this.transactionRepository.delete({ userId, id });
    return result.affected > 0;
  }
}
