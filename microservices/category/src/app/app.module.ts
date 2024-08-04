import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category/entities/category.entity';
import { GatewayAuthMiddleware } from './middlewares/gateway-auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'fa_categories',
      entities: [Category],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GatewayAuthMiddleware).forRoutes('*');
  }
}
