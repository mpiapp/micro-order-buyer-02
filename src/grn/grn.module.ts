import { Module } from '@nestjs/common';
import { GrnService } from './services/grn.service';
import { GrnController } from './grn.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DN, DNSchema } from './../delivery-note/schemas/delivery-note.schema';
import { ConfigModule } from '@nestjs/config';
import configuration from './../config/configuration';
import { Helper } from './../utils/helper.utils';
import { GenerateCoderService } from './../purchase-order/services/purchase-order-generate-code.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DN.name, schema: DNSchema }]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [GrnService, Helper, GenerateCoderService],
  controllers: [GrnController],
})
export class GrnModule {}
