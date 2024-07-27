import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: "test@mail.com" })
  email: string;

  @IsString()
  @ApiProperty({ example: "password" })
  password: string;
}
