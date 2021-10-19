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
import { PaginatePackageService } from './services/paginate-package.service';
import { Helper } from './../utils/helper.utils';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PO.name, schema: POSchema }]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [
    PackageService,
    GenerateCoderService,
    PaginatePackageService,
    Helper,
  ],
  controllers: [PackageController],
})
export class PackageModule {}
