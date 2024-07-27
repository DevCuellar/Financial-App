import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification/entities/notification.entity';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'fa_notifications',
      entities: [Notification],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
