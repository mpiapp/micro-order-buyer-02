import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsObject, IsOptional, IsString } from 'class-validator';
import { ShippingAddressDto } from './../../../../config/dto/address.dto';

export class DeliveryShippingDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  code: string;
  @ApiProperty()
  @IsObject()
  shipping_address: ShippingAddressDto;
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  despatch_date: Date;
}
