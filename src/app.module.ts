import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PurchaseRequestModule } from './purchase-request/purchase-request.module';
import { TemplateModule } from './template/template.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
