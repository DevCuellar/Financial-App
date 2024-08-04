import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/authuser.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayAuthMiddleware } from './middlewares/gateway-auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'fa_auth',
      entities: [User],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GatewayAuthMiddleware).forRoutes('*');
  }
}
