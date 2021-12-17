import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsString,
  MaxLength,
} from 'class-validator';
import { PackageDto } from './Package.dto';
import { VendorDto } from './vendor.dto';

export class VendorOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  code_po: string;
  @ApiProperty()
  @IsObject()
  vendor: VendorDto;
  @ApiProperty()
  @IsArray()
  packages: PackageDto[];
}
