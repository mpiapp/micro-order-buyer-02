import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';
import { GRNReceived, TGrnUpdate } from '../interfaces/types/grn-update.type';
import { GRNItems } from './Items.dto';

export class GRNUpdateDto implements TGrnUpdate {
  @ApiProperty()
  @IsObject()
  received: GRNReceived;
  @ApiProperty()
  @IsArray()
  items: GRNItems[];
}
