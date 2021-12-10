import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './../../../database/schema/orders.schema';
import { ConfigModule } from '@nestjs/config';
import configuration from './../../../config/configuration';
import { OrderPaginateService } from './services/order-paginate.service';
import { Helper } from './../../../utils/helper.utils';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [OrdersService, OrderPaginateService, Helper],
  controllers: [OrdersController],
})
export class OrdersModule {}
