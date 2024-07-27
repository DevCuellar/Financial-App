import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
