import { IsArray } from 'class-validator';
import { ItemDto } from './Items.dto';
import { StatusDto } from './Status.dto';

export class PRUpdateDto {
  @IsArray()
  status: StatusDto[];
  @IsArray()
  items: ItemDto[];
}
