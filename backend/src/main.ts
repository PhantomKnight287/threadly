import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import 'src/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet(), morgan('dev'));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
