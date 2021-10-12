import { Module } from '@nestjs/common';
import { ApprovalController } from './approval.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [],
  controllers: [ApprovalController],
})
export class ApprovalModule {}
