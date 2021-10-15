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
import { IPurchaseOrderItem } from '../interfaces/type/IPurchaseOrderItem.interface';

export class PurchaseOrderItemDto implements IPurchaseOrderItem {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productId: string;
  @ApiProperty()
  @IsOptional()
  payment_terms?: string;
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
  quantity: number;
  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;
  @ApiProperty()
  @IsNumber()
  @Min(0)
  tax?: number;
  @ApiProperty()
  @IsArray()
  statuses: StatusDto[];
}
