import { HttpService } from '@nestjs/axios';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto';
import { sendSuccess, sendError } from '@shared';
import { Response } from 'express';
import { VerifyEmailDto } from '../dto/verify-email.dto';
import { AuthService } from '../services/auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private httpService: HttpService,
    private readonly authService: AuthService
  ) {}

  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 409, description: 'Conflict. User already exists.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Post('register')
  async register(@Res() res: Response, @Body() registerDto: RegisterDto) {
    try {
      const response = await this.authService.register(registerDto);
      return sendSuccess(res, response.data, response.status);
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

  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User successfully logged.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Post('login')
  async login(@Res() res: Response, @Body() loginDto: LoginDto) {
    try {
      const response = await this.authService.login(loginDto);
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

  @ApiBody({ type: VerifyEmailDto })
  @ApiResponse({ status: 200, description: 'Email verified.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid token.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
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
