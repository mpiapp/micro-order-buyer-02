import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PO,
  POSchema,
} from './../purchase-order/schemas/purchase-order.schema';
import { ConfigModule } from '@nestjs/config';
import configuration from './../config/configuration';
import { OrderPaginateService } from './services/order-paginate.service';
import { GenerateCoderService } from 'src/purchase-order/services/purchase-order-generate-code.service';
import { Helper } from 'src/utils/helper.utils';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PO.name, schema: POSchema }]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [
    OrdersService,
    OrderPaginateService,
    GenerateCoderService,
    Helper,
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
