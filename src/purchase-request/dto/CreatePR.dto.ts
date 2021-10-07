import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
} from 'class-validator';
import { HistoryDto } from './History.dto';
import { ItemDto } from './Items.dto';
import { StatusDto } from './Status.dto';

export class PRCreateDto {
  @IsNotEmpty()
  @MaxLength(50)
  code: string;
  @IsDate()
  date: Date;
  @IsNotEmpty()
  @IsArray()
  buyerId: string;
  @IsArray()
  @IsNotEmpty()
  items: ItemDto[];
  @IsNumber()
  @Min(0)
  total: number;
  @IsArray()
  statuses: StatusDto[];
  @IsArray()
  @IsNotEmpty()
  history: HistoryDto[];
}
