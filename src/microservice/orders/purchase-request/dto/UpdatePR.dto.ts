import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ItemPRDto } from './Items.dto';
import { StatusDto } from './Status.dto';

export class PRUpdateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  items?: ItemPRDto[];
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
