import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TShippingAddress } from '../type/AddressShipping.type';

export class ShippingAddressDto implements TShippingAddress {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  zip_code: number;
}
