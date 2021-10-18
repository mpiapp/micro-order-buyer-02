import { Module } from '@nestjs/common';
import { PackageService } from './services/package.service';
import { PackageController } from './package.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PO,
  POSchema,
} from './../purchase-order/schemas/purchase-order.schema';
import { ConfigModule } from '@nestjs/config';
import configuration from './../config/configuration';
import { GenerateCoderService } from './../purchase-order/services/purchase-order-generate-code.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PO.name, schema: POSchema }]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [PackageService, GenerateCoderService],
  controllers: [PackageController],
})
export class PackageModule {}
