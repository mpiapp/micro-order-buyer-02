import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';
import { VendorDto } from './../../../../config/dto/vendor.dto';
import { PackageTemplateDto } from './PackageTemplate.dto';

export class VendorTemplateDto {
  @ApiProperty()
  @IsObject()
  vendor: VendorDto;
  @ApiProperty()
  @IsArray()
  packages: PackageTemplateDto[];
}
