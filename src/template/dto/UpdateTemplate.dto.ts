import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ItemTemplateDto } from './ItemTemplate.dto';

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
  items: ItemTemplateDto[];
}
