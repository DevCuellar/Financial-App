import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module';
import { CategoryService } from './services/category.service';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
