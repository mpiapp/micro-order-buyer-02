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
import { StatusDto } from './Status.dto';
import { VendorOrderDto } from './vendor-order.dto';

export class OrderCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  code_pr: string;
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;
  @ApiProperty()
  @IsNotEmpty()
  buyerId: string;
  @ApiProperty()
  @IsNotEmpty()
  addressId: string;
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  vendors: VendorOrderDto[];
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
