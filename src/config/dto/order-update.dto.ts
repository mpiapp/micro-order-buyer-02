import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ShippingAddressDto } from './address.dto';
import { VendorOrderDto } from './vendor-order.dto';

export class OrderUpdateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
  @ApiProperty()
  @IsOptional()
  @IsObject()
  address: ShippingAddressDto;
  @ApiProperty()
  @IsArray()
  @IsOptional()
  vendors: VendorOrderDto[];
  @ApiProperty()
  @IsNumber()
  @Min(0)
  total: number;
}
