import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto';
import { firstValueFrom } from 'rxjs';
import { AUTH_URL } from '../../../config/base-urls.constants';
import { sendSuccess, sendError } from '@shared';
import { Response } from 'express';
import { VerifyEmailDto } from '../dto/verify-email.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private httpService: HttpService,
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async register(@Res() res: Response, @Body() registerDto: RegisterDto) {
    try {
      const response = await this.authService.register(registerDto);
      return sendSuccess(res, response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        return sendError(
          res,
          error.response.data.errors,
          error.response.status
        );
      }
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  async login(@Res() res: Response, @Body() loginDto: LoginDto) {
    try {
      const response = await this.authService.register(loginDto);
      return sendSuccess(res, response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        return sendError(
          res,
          error.response.data.errors,
          error.response.status
        );
      }
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('verify-email')
  async verifyEmail(
    @Res() res: Response,
    @Body() verifyEmailDto: VerifyEmailDto
  ) {
    try {
      const response = await this.authService.verifyEmail(verifyEmailDto);
      return sendSuccess(res, response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        return sendError(
          res,
          error.response.data.errors,
          error.response.status
        );
      }
      return sendError(res, [error.message], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
