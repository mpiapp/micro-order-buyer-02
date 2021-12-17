import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { StatusDto } from './../../../../config/dto/Status.dto';
import { IPackage } from './../../../orders/purchase-order/interfaces/type/IPOPackage.interface';
import { ItemPRDto } from './../../../orders/purchase-request/dto/Items.dto';

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
