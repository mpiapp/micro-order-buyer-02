import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { ItemDto } from './Items.dto';
import { StatusDto } from './Status.dto';

export class PRUpdateDto {
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  items?: ItemDto[];
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  total?: number;
  @ApiProperty()
  @IsArray()
  @IsOptional()
  statuses?: StatusDto[];
}
