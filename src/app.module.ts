import {
  CacheModule,
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './middleware/logs.middleware';
import { LoggerModule } from 'nestjs-pino';
import { BugsnagModule } from '@nkaurelien/nest-bugsnag';
import bugsnagPluginExpress from '@bugsnag/plugin-express';
import { OrdersModules } from './microservice/orders';
import { FulfillmentModules } from './microservice/fulfilment';
import { StatusModule } from './microservice/status/status.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGOS_URI,
      }),
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    BugsnagModule.forRoot({
      apiKey: process.env.BUGSNAG,
      plugins: [bugsnagPluginExpress],
    }),
    LoggerModule.forRoot(),
    ...OrdersModules,
    ...FulfillmentModules,
    StatusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
