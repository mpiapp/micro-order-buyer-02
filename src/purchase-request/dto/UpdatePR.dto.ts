import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { ItemDto } from './Items.dto';
import { StatusDto } from './Status.dto';

export class PRUpdateDto {
  @ApiProperty()
  @IsArray()
  status: StatusDto[];
  @ApiProperty()
  @IsArray()
  items: ItemDto[];
}
