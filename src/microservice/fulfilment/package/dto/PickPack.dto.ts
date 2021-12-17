import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { VendorDto } from './../../../../config/dto/vendor.dto';
import { StatusDto } from './../../../../config/dto/Status.dto';
import { ItemPackageDto } from './PIckItems.dto';

export class pickPackPackageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
  @ApiProperty()
  @IsObject()
  vendor: VendorDto;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code_po: string;
  @ApiProperty()
  @IsArray()
  items: ItemPackageDto[];
  @ApiProperty()
  @IsArray()
  statuses: StatusDto;
}
