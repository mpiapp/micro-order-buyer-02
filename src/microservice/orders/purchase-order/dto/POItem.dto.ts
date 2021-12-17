import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Items } from './../../../product/items/dto/Items.dto';
import { StatusDto } from './../../purchase-request/dto/Status.dto';

export class PurchaseOrderItemDto extends Items {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code_po: string;
  @ApiProperty()
  @IsOptional()
  package?: string;
  @ApiProperty()
  @IsNumber()
  @Min(0)
  tax?: number;
  @ApiProperty()
  @IsArray()
  statuses: StatusDto[];
}
