import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

export class CategoryDto {
  @Expose()
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;

  @Exclude()
  @IsNumber()
  @ApiProperty({ example: 1 })
  userId: number;

  @Expose()
  @IsString()
  @ApiProperty({ example: "Groceries" })
  name: string;

  @Expose()
  @IsOptional() 
  @IsString()
  @ApiProperty({ example: "Expenses related to food and groceries" })
  description?: string;

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
