import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliveryNoteController } from './delivery-note.controller';
import { DeliveryNoteService } from './services/delivery-note.service';
import * as pino from 'pino';
import { LoggerModule } from 'nestjs-pino';
import configuration from 'src/config/configuration';
import { Helper } from 'src/utils/helper.utils';
import {
  DeliveryNote,
  DNSchema,
} from 'src/database/schema/delivery-note.schema';

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
  controllers: [DeliveryNoteController],
  providers: [DeliveryNoteService, Helper],
})
export class DeliveryNoteModule {}
