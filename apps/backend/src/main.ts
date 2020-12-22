import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import {environment} from "./environments/environment";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(environment.APP_PORT, () => {
    Logger.log('Server is started at http://localhost:' + environment.APP_PORT + '/');
  });
}

bootstrap();
