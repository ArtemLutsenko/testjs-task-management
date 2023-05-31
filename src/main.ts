import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from "./transform.interceptor";
import {Logger} from "@nestjs/common";
import * as dotenv from 'dotenv';
dotenv.config();


async function bootstrap() {
  const logger = new Logger()
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(process.env.PORT);
  logger.log(`Application listennig at port ${process.env.PORT} `)
}
bootstrap();
