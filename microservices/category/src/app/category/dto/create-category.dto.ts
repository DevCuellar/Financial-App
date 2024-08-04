import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @ApiProperty({ example: 'Groceries' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Expenses related to food and groceries' })
  description?: string;

  @IsNumber()
  @ApiProperty({ example: 1 })
  userId: number;
}
