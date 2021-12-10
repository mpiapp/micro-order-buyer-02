import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, Min } from 'class-validator';
import { Items } from './../../items/dto/Items.dto';

export class PackageTemplateDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  total: number;
  @ApiProperty()
  @IsArray()
  items: Items[];
}
