import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AUTH_URL } from '../../../config/base-urls.constants';
import { JwtPayloadDto, LoginDto, RegisterDto } from '../dto';
import { VerifyEmailDto } from '../dto/verify-email.dto';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async register(registerDto: RegisterDto) {
    const endPoint = `auth/register`;
    return await firstValueFrom(
      this.httpService.post(`${AUTH_URL}${endPoint}`, registerDto)
    );
  }

  async login(loginDto: LoginDto) {
    const endPoint = `auth/login`;
    return await firstValueFrom(
      this.httpService.post(`${AUTH_URL}${endPoint}`, loginDto)
    );
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const endPoint = `auth/verify-email`;
    return await firstValueFrom(
      this.httpService.post(`${AUTH_URL}${endPoint}`, verifyEmailDto)
    );
  }

  async validateToken(token: string): Promise<JwtPayloadDto | null> {
    try {
      const endPoint = `auth/validate-token`;
      const response = await firstValueFrom(
        this.httpService.post(`${AUTH_URL}${endPoint}`, { token: token })
      );
      return response.data.user;
    } catch (error) {
      return null;
    }
  }
}
