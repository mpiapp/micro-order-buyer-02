import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { IPurchaseOrderItem } from '../interfaces/type/IPurchaseOrderItem.interface';

export class PurchaseOrderItemDto implements IPurchaseOrderItem {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productId: string;
  @ApiProperty()
  @IsOptional()
  payment_terms?: IPaymentTerm;
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
}
