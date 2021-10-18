import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginExpress from '@bugsnag/plugin-express';

Bugsnag.start({
  apiKey: process.env.BUGSNAG,
  plugins: [BugsnagPluginExpress],
  appVersion: process.env.APP_VERSION,
  logger: null,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Order Service')
    .setDescription('The Order Service API description')
    .setVersion('0.0.1')
    .addTag('Service')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

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

  const bugsnagMiddleware = Bugsnag.getPlugin('express');
  app.use(bugsnagMiddleware.requestHandler);
  app.use(bugsnagMiddleware.errorHandler);

  await app.listen(process.env.PORT);
}
bootstrap();
