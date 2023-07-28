import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import helmet from 'helmet';
import morgan from 'morgan';
import { AppModule } from './app.module';
import './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet(), morgan('dev'));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
