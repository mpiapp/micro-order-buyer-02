import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { VendorTemplateDto } from './VendorTemplate.dto';

export class TemplateUpdateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  vendors: VendorTemplateDto[];
  @ApiProperty()
  @IsNumber()
  @Min(0)
  total: number;
}
