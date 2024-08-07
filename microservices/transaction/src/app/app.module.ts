import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';
import { GatewayAuthMiddleware } from './middlewares/gateway-auth.middleware';

@Module({
  imports: [TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GatewayAuthMiddleware).forRoutes('*');
  }
}
