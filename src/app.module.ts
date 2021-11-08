import {
  CacheModule,
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseRequestModule } from './purchase-request/purchase-request.module';
import { TemplateModule } from './template/template.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { PackageModule } from './package/package.module';
import { OrdersModule } from './orders/orders.module';
import { DeliveryNoteModule } from './delivery-note/delivery-note.module';
import { GrnModule } from './grn/grn.module';
import { LoggerMiddleware } from './middleware/logs.middleware';
import { LoggerModule } from 'nestjs-pino';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PurchaseRequestModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGOS_URI,
      }),
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    LoggerModule.forRoot(),
    TemplateModule,
    PurchaseOrderModule,
    PackageModule,
    OrdersModule,
    DeliveryNoteModule,
    GrnModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
