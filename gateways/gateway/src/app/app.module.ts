import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { CategoryModule } from './features/category/category.module';

@Module({
  imports: [AuthModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
