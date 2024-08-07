import { Module } from '@nestjs/common';
import { AuthModule } from './features/auth/auth.module';
import { CategoryModule } from './features/category/category.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpHeaderInterceptor } from './interceptors/http-header.interceptor';
import { HttpModule } from '@nestjs/axios';
import { TransactionModule } from './features/transaction/transaction.module';

@Module({
  imports: [HttpModule, AuthModule, CategoryModule, TransactionModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpHeaderInterceptor,
    },
  ],
})
export class AppModule {}
