import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { StatusDto } from './Status.dto';
import { VendorOrderDto } from './vendor-order.dto';

export class OrderUpdateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
  @ApiProperty()
  @IsOptional()
  addressId: string;
  @ApiProperty()
  @IsArray()
  @IsOptional()
  vendors: VendorOrderDto[];
  @ApiProperty()
  @IsNumber()
  @Min(0)
  total: number;
  @ApiProperty()
  @IsArray()
  @IsOptional()
  statuses: StatusDto[];
}
