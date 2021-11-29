import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { GRNItems } from './Items.dto';

export class GRNUpdateDto {
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
