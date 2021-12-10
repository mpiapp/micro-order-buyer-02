import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ItemPRDto } from './../../purchase-request/dto/Items.dto';
import { IPackage } from './../../purchase-order/interfaces/type/IPOPackage.interface';
import { StatusDto } from './../../purchase-request/dto/Status.dto';

export class PackageDto implements IPackage {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code_package: string;
  @ApiProperty()
  @IsArray()
  items: ItemPRDto[];
  @ApiProperty()
  @IsArray()
  statuses: StatusDto[];
}
