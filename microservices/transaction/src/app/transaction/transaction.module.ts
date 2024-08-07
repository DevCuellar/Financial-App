import { Module } from '@nestjs/common';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './controllers/transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
