import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Helper } from './../utils/helper.utils';
import configuration from './../config/configuration';
import { DeliveryNoteController } from './delivery-note.controller';
import { DN, DNSchema } from './schemas/delivery-note.schema';
import { DeliveryNoteService } from './services/delivery-note.service';
import * as pino from 'pino';
import { LoggerModule } from 'nestjs-pino';

const dest = pino.extreme();
const logger = pino(dest);

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DN.name, schema: DNSchema }]),
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
