import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { StatusDto } from './../../purchase-request/dto/Status.dto';
import { ItemTemplateDto } from './ItemTemplate.dto';

export class TemplateCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  buyerId: string;
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  items: ItemTemplateDto[];
  @ApiProperty()
  @IsArray()
  statuses: StatusDto[];
  @ApiProperty()
  @IsNotEmpty()
  createdBy: string;
}
