import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { TransactionType } from '../enums/transaction-type.enum';

export class TransactionDto {
  @Expose()
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;

  @Exclude()
  @IsNumber()
  @ApiProperty({ example: 1 })
  userId: number;

  @Expose()
  @IsNumber()
  @ApiProperty({ example: 1 })
  categoryId: number;

  @Expose()
  @IsEnum(TransactionType)
  @ApiProperty({ enum: TransactionType, example: TransactionType.INCOME })
  type: TransactionType;

  @Expose()
  @IsDateString()
  @ApiProperty({ example: "2000-01-01T12:00:00Z" })
  date: Date;

  @Expose()
  @IsNumber()
  @ApiProperty({ example: 9.99 })
  amount: number;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Debt charge' })
  description: string;

  @Expose()
  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: "2000-01-01T12:00:00Z" })
  createdAt?: Date;

  @Expose()
  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: "2000-01-01T12:00:00Z" })
  updatedAt?: Date; 
}
