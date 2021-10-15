import { Module } from '@nestjs/common';
import { PurchaseOrderService } from './services/purchase-order.service';
import { PurchaseOrderController } from './purchase-order.controller';
import { PO, POSchema } from './schemas/purchase-order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './../config/configuration';
import { GenerateCodePurchaseOrderService } from './services/purchase-order-generate-code.service';
import { Helper } from './../utils/helper.utils';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PO.name, schema: POSchema }]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [PurchaseOrderService, GenerateCodePurchaseOrderService, Helper],
  controllers: [PurchaseOrderController],
})
export class PurchaseOrderModule {}
