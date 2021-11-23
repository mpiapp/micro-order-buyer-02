import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { StatusDto } from './../../purchase-request/dto/Status.dto';
import { Items } from './../../items/dto/Items.dto';

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
