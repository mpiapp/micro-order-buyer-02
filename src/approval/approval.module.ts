import { Module } from '@nestjs/common';
import { ApprovalController } from './approval.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './../config/configuration';
import { PurchaseOrderService } from 'src/purchase-order/services/purchase-order.service';
import { PurchaseRequestService } from 'src/purchase-request/services/purchase-request.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [PurchaseOrderService, PurchaseRequestService],
  controllers: [ApprovalController],
})
export class ApprovalModule {}
