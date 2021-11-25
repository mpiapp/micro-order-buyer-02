import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ItemPRDto } from '../../purchase-request/dto/Items.dto';
import { StatusDto } from '../../purchase-request/dto/Status.dto';

export class pickPackPackageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code_po: string;
  @ApiProperty()
  @IsArray()
  items: ItemPRDto[];
  @ApiProperty()
  @IsArray()
  statuses: StatusDto;
}
