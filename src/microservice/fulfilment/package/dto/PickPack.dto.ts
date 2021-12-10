import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { StatusDto } from './../../../../config/dto/Status.dto';
import { ItemPackageDto } from './PIckItems.dto';

export class pickPackPackageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vendorId: string;
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
