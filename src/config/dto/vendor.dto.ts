import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { TVendor } from './../type/Vendor.type';

export class VendorDto implements TVendor {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  _id: string;
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;
}
