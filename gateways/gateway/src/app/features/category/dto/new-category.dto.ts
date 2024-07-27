import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class NewCategoryDto {
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
