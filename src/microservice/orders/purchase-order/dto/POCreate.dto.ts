import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { IStatus } from './../../purchase-request/interfaces/type/IStatus.interface';
import { IPurchaseOrder } from './../interfaces/type/IPOcreate.interface';
import { IPurchaseOrderVendors } from './../interfaces/type/IPOVendor.interface';

export class POCreateDto implements IPurchaseOrder {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;
  @ApiProperty()
  @IsDate()
  date: Date;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  buyerId: string;
  @ApiProperty()
  @IsNotEmpty()
  addressId: string;
  @ApiProperty()
  @IsArray()
  vendors: IPurchaseOrderVendors[];
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  total: number;
  @ApiProperty()
  @IsArray()
  statuses: IStatus[];
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
