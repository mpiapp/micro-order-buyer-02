import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: process.env.KAFKA.split(','),
        },
        consumer: {
          groupId: 'dev-orders-service',
        },
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      // disableErrorMessages: true,
      forbidUnknownValues: true,
    }),
  );

  app.useLogger(app.get(Logger));
  await app.listen();
}
bootstrap();
