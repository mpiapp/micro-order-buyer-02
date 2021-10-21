import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
} from 'class-validator';
import { ItemPRDto } from './Items.dto';
import { StatusDto } from './Status.dto';

export class PRCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;
  @ApiProperty()
  @IsNotEmpty()
  buyerId: string;
  @ApiProperty()
  @IsNotEmpty()
  addressId: string;
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  items: ItemPRDto[];
  @ApiProperty()
  @IsNumber()
  @Min(0)
  total: number;
  @ApiProperty()
  @IsArray()
  statuses: StatusDto[];
  @ApiProperty()
  @IsNotEmpty()
  createdBy: string;
}
