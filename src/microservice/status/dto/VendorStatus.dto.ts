import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { TStatusVendorLevel } from '../interfaces/type/StatusVendorLevel.type';
import { StatusDto } from './../../../config/dto/status.dto';

export class VendorStatusDto implements TStatusVendorLevel {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vendorId: string;
  @ApiProperty()
  @IsArray()
  status: StatusDto;
}
