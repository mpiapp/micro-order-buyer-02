import { Module } from '@nestjs/common';
import { PackageService } from './services/package.service';
import { PackageController } from './package.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './../config/configuration';
import { PaginatePackageService } from './services/paginate-package.service';
import { Helper } from './../utils/helper.utils';
import { PickPackService } from './services/pickpack.service';
import { Order, OrderSchema } from './../database/schema/orders.schema';
import { ProofPaymentService } from './services/proof.payment.package.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [
    PackageService,
    PaginatePackageService,
    Helper,
    PickPackService,
    ProofPaymentService,
  ],
  controllers: [PackageController],
})
export class PackageModule {}
