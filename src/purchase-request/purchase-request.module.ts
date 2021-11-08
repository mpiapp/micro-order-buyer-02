import { CacheModule, Module } from '@nestjs/common';
import { PurchaseRequestService } from './services/purchase-request.service';
import { PurchaseRequestController } from './purchase-request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PR, PRSchema } from './schemas/purchase-request.schema';
import { GenerateService } from './services/generate.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './../config/configuration';
import { UpdateItemsService } from './services/update-items.service';
import { UpdateStatusService } from './services/update-status.service';
import { Helper } from './../utils/helper.utils';
import { LoggerModule } from 'nestjs-pino';
import * as pino from 'pino';

const dest = pino.extreme();
const logger = pino(dest);

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PR.name, schema: PRSchema }]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    CacheModule.register({
      ttl: 2,
    }),
    LoggerModule.forRoot({ pinoHttp: { logger } }),
  ],
  providers: [
    PurchaseRequestService,
    GenerateService,
    UpdateItemsService,
    UpdateStatusService,
    Helper,
  ],
  controllers: [PurchaseRequestController],
})
export class PurchaseRequestModule {}
