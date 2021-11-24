import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { PackageDto } from './Package.dto';

export class VendorOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  code_po: string;
  @ApiProperty()
  @IsString()
  vendorId?: string;
  @ApiProperty()
  @IsArray()
  packages: PackageDto[];
}
