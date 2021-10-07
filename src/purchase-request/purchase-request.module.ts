import { Module } from '@nestjs/common';
import { PurchaseRequestService } from './services/purchase-request.service';
import { PurchaseRequestController } from './purchase-request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PR, PRSchema } from './schemas/purchase-request.schema';
import { GenerateService } from './services/generate.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: PR.name, schema: PRSchema }])],
  providers: [PurchaseRequestService, GenerateService],
  controllers: [PurchaseRequestController],
})
export class PurchaseRequestModule {}
