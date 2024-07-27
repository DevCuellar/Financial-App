import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [CategoryController]
})
export class CategoryModule {}
