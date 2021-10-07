import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;
  @ApiProperty()
  @IsDate()
  date: Date;
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  buyerId: string;
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  items: ItemDto[];
  @ApiProperty()
  @IsNumber()
  @Min(0)
  total: number;
  @ApiProperty()
  @IsArray()
  statuses: StatusDto[];
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  history: HistoryDto[];
}
