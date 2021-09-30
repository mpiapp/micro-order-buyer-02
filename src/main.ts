import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionFilter } from './utils/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // disableErrorMessages: true,
      forbidUnknownValues: true,
    }),
  );
  app.useGlobalFilters(new ExceptionFilter());
  await app.listen(3000);
}
bootstrap();
