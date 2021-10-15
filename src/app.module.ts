import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseRequestModule } from './purchase-request/purchase-request.module';
import { TemplateModule } from './template/template.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PurchaseRequestModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGOS_URI,
      }),
    }),
    TemplateModule,
    PurchaseOrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
