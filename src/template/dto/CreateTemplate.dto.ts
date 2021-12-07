import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { VendorTemplateDto } from './VendorTemplate.dto';

export class TemplateCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  buyerId: string;
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
  @ApiProperty()
  @IsNotEmpty()
  createdBy: string;
}
