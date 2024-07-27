import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CategoryResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsOptional() 
  @IsString()
  description: string;

  @IsNumber()
  userId: number;

  @IsDateString()
  createdAt?: Date;

  @IsDateString()
  updatedAt?: Date;
}
