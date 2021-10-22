import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GenerateCoderService } from './../purchase-order/services/purchase-order-generate-code.service';
import { Helper } from './../utils/helper.utils';
import configuration from './../config/configuration';
import { DeliveryNoteController } from './delivery-note.controller';
import { DN, DNSchema } from './schemas/delivery-note.schema';
import { DeliveryNoteService } from './services/delivery-note.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DN.name, schema: DNSchema }]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [DeliveryNoteController],
  providers: [DeliveryNoteService, Helper, GenerateCoderService],
})
export class DeliveryNoteModule {}
