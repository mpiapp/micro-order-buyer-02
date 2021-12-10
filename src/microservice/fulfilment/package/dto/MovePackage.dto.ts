import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ItemPRDto } from './../../purchase-request/dto/Items.dto';

export class MoveItemPackageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  from_package: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  to_package: string;
  @ApiProperty()
  @IsArray()
  items: ItemPRDto[];
}
