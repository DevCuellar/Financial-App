import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CategoryDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;

  @IsString()
  @ApiProperty({ example: "Groceries" })
  name: string;

  @IsOptional() 
  @IsString()
  @ApiProperty({ example: "Expenses related to food and groceries" })
  description?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: "2000-01-01T12:00:00Z" })
  createdAt?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: "2000-01-01T12:00:00Z" })
  updatedAt?: Date;
}
