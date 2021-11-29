import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { TGrnUpdate } from '../interfaces/types/grn-update.type';
import { GRNItems } from './Items.dto';

export class GRNUpdateDto implements TGrnUpdate {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code_good_received_note: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  receivedUserId: string;
  @ApiProperty()
  @IsArray()
  items: GRNItems[];
}
