import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import configuration from './../config/configuration';
import { Template, TemplateSchema } from './schemas/template.schema';
import { TemplateItemsService } from './services/template-items.service';
import { TemplateService } from './services/template.service';
import { TemplateController } from './template.controller';
import * as pino from 'pino';

const dest = pino.extreme();
const logger = pino(dest);

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Template.name, schema: TemplateSchema },
    ]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    CacheModule.register({
      ttl: 2,
    }),
    LoggerModule.forRoot({ pinoHttp: { logger } }),
  ],
  providers: [TemplateService, TemplateItemsService],
  controllers: [TemplateController],
})
export class TemplateModule {}
