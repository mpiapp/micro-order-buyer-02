import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { PackageTemplateDto } from './PackageTemplate.dto';

export class VendorTemplateDto {
  @ApiProperty()
  @IsString()
  vendorId: string;
  @ApiProperty()
  @IsArray()
  packages: PackageTemplateDto[];
}
