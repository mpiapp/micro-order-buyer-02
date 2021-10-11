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
import { StatusDto } from 'src/purchase-request/dto/Status.dto';
import { IPurchaseOrder } from '../interfaces/type/IPOcreate.interface';
import { PurchaseOrderItemDto } from './POItem.dto';

export class createPODto implements IPurchaseOrder {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;
  @ApiProperty()
  @IsNotEmpty()
  buyerId: string;
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  items: PurchaseOrderItemDto[];
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
