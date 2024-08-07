import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GatewayAuthMiddleware } from './middlewares/gateway-auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionModule } from './transaction/transaction.module';
import { Transaction } from './transaction/entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'fa_transactions',
      entities: [Transaction],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GatewayAuthMiddleware).forRoutes('*');
  }
}
