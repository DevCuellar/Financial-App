import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'notifications_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  app.startAllMicroservices();
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  dotenv.config();
  const port = process.env.PORT || 3099;
  await app.listen(port);
  Logger.log(
    `✉️ Notification is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
