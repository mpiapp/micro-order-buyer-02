import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseRequestModule } from './purchase-request/purchase-request.module';
import { TemplateModule } from './template/template.module';
import { ApprovalModule } from './approval/approval.module';

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
    ApprovalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
