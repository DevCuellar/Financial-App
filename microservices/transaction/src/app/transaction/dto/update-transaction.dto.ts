import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { TransactionType } from '../enums/transaction-type.enum';

export class UpdateTransactionDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  userId: number;

  @IsNumber()
  @ApiProperty({ example: 1 })
  categoryId: number;

  @IsEnum(TransactionType)
  @ApiProperty({ enum: TransactionType, example: TransactionType.INCOME })
  type: TransactionType;

  @IsDateString()
  @ApiProperty({ example: '2000-01-01T12:00:00Z' })
  date: Date;

  @IsNumber()
  @ApiProperty({ example: 9.99 })
  amount: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Debt charge' })
  description: string;
}
