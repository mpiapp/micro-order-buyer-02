import { CacheModule, Module } from '@nestjs/common';
import { PurchaseOrderService } from './services/purchase-order.service';
import { PurchaseOrderController } from './purchase-order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './../config/configuration';
import { GenerateCoderService } from './services/purchase-order-generate-code.service';
import { Helper } from './../utils/helper.utils';
import { LoggerModule } from 'nestjs-pino';
import * as pino from 'pino';
import { Order, OrderSchema } from './../database/schema/orders.schema';

const dest = pino.extreme();
const logger = pino(dest);

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    CacheModule.register({
      ttl: 2,
    }),
    LoggerModule.forRoot({ pinoHttp: { logger } }),
  ],
  providers: [PurchaseOrderService, GenerateCoderService, Helper],
  controllers: [PurchaseOrderController],
})
export class PurchaseOrderModule {}
