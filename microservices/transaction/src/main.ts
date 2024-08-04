import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  dotenv.config();
  const port = process.env.PORT || 3003;
  await app.listen(port);
  Logger.log(
    `🪙 Transaction is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
