import { Module } from '@nestjs/common';
import { DeliveryNoteStatusService } from './services/delivery-note-status.service';
import { OrdersStatusService } from './services/orders-status.service';
import { StatusController } from './status.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './../../database/schema/orders.schema';
import {
  DeliveryNote,
  DNSchema,
} from './../../database/schema/delivery-note.schema';
import { LoggerModule } from 'nestjs-pino';
import * as pino from 'pino';

const dest = pino.extreme();
const logger = pino(dest);

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: DeliveryNote.name, schema: DNSchema },
    ]),
    LoggerModule.forRoot({ pinoHttp: { logger } }),
  ],
  controllers: [StatusController],
  providers: [DeliveryNoteStatusService, OrdersStatusService],
})
export class StatusModule {}
