import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { AuthResponseDto, VerifyEmailDto, RegisterDto, LoginDto } from '../dto';
import { sendError, sendSuccess } from '@shared';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Res() res: Response, @Body() registerDto: RegisterDto) {
    try {
      await this.authService.register(registerDto);
      return sendSuccess(res, {}, 201);
    } catch (error) {
      return sendError(res, [error.message], HttpStatus.CONFLICT);
    }
  }

  @Post('login')
  async login(@Res() res: Response, @Body() loginDto: LoginDto) {
    try {
      const response: AuthResponseDto = await this.authService.login(loginDto);
      return sendSuccess(res, response);
    } catch (error) {
      return sendError(res, [error.message], 401);
    }
  }

  @Post('verify-email')
  async verifyEmail(
    @Res() res: Response,
    @Body() verifyEmailDto: VerifyEmailDto
  ) {
    try {
      const ok = await this.authService.verifyEmail(verifyEmailDto.token);
      if (ok) {
        sendSuccess(res, {});
      }
    } catch (error) {
      return sendError(res, [error.message], 401);
    }
  }

  @Post('validate-token')
  async validateToken(@Body('token') token: string): Promise<{ user }> {
    const user = await this.authService.validateToken(token);
    return { user };
  }
}
