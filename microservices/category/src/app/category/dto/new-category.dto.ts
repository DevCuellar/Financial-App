import { IsString, IsNumber, IsOptional } from 'class-validator';

export class NewCategoryDto {
  @IsString()
  name: string;

  @IsOptional() 
  @IsString()
  description: string;

  @IsNumber()
  userId: number;
}
