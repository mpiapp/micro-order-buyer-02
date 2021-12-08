import { CacheModule, Module } from '@nestjs/common';
import { GrnService } from './services/grn.service';
import { GrnController } from './grn.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './../config/configuration';
import { Helper } from './../utils/helper.utils';
import * as pino from 'pino';
import { LoggerModule } from 'nestjs-pino';
import {
  DeliveryNote,
  DNSchema,
} from './../database/schema/delivery-note.schema';

const dest = pino.extreme();
const logger = pino(dest);

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DeliveryNote.name, schema: DNSchema }]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    CacheModule.register({
      ttl: 2,
    }),
    LoggerModule.forRoot({ pinoHttp: { logger } }),
  ],
  providers: [GrnService, Helper],
  controllers: [GrnController],
})
export class GrnModule {}
