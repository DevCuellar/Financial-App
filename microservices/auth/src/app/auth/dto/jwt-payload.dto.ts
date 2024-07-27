import { IsEmail, IsInt } from 'class-validator';

export class JwtPayloadDto {
  @IsInt()
  sub: number;

  @IsEmail()
  email: string;

  @IsInt()
  iat: number;

  @IsInt()
  exp: number;
}
