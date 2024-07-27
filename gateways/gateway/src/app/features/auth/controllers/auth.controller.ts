import { HttpService } from '@nestjs/axios';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto';
import { firstValueFrom } from 'rxjs';
import { AUTH_URL } from '../../../config/base-urls.constants';
import { sendSuccess, sendError } from '@shared';
import { Response } from 'express';
import { VerifyEmailDto } from '../dto/veryfy-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private httpService: HttpService) {}

  @Post('register')
  async register(@Res() res: Response, @Body() registerDto: RegisterDto) {
    try {
      const endPoint= `auth/register`;
      const response = await firstValueFrom(
        this.httpService.post(`${AUTH_URL}${endPoint}`, registerDto)
      );
      return sendSuccess(res, response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        return sendError(res, error.response.data.errors, error.response.status);
      }
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  async login(@Res() res: Response, @Body() loginDto: LoginDto) {
    try {
      const endPoint= `auth/login`;
      const response = await firstValueFrom(
        this.httpService.post(`${AUTH_URL}${endPoint}`, loginDto)
      );
      return sendSuccess(res, response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        return sendError(res, error.response.data.errors, error.response.status);
      }
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('verify-email')
  async verifyEmail(@Res() res: Response, @Body() verifyEmailDto: VerifyEmailDto) {
    try {
      const endPoint= `auth/verify-email`;
      const response = await firstValueFrom(
        this.httpService.post(`${AUTH_URL}${endPoint}`, verifyEmailDto)
      );
      return sendSuccess(res, response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        return sendError(res, error.response.data.errors, error.response.status);
      }
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
