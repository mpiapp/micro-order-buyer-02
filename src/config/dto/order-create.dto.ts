import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  MaxLength,
  Min,
} from 'class-validator';
import { ShippingAddressDto } from './address.dto';
import { BuyerDto } from './buyer.dto';
import { VendorOrderDto } from './vendor-order.dto';

export class OrderCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  code: string;
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;
  @ApiProperty()
  @IsObject()
  buyer: BuyerDto;
  @ApiProperty()
  @IsObject()
  address: ShippingAddressDto;
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  vendors: VendorOrderDto[];
  @ApiProperty()
  @IsNumber()
  @Min(0)
  total: number;
  @ApiProperty()
  @IsNotEmpty()
  createdBy: string;
}
