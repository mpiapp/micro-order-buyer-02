import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';
import { Items } from './../../../product/items/dto/Items.dto';

export class ItemPackageDto extends Items {
  @ApiProperty()
  @IsNumber()
  suggest_sub_price: number;
  @ApiProperty()
  @IsNumber()
  suggest_quantity: number;
  @ApiProperty()
  @IsBoolean()
  updated: boolean;
}
