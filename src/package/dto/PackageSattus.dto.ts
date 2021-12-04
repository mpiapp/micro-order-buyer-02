import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { StatusDto } from './../../purchase-request/dto/Status.dto';

export class PackageStatusDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vendorId: string;
  @ApiProperty()
  @IsArray()
  statuses: StatusDto;
}
