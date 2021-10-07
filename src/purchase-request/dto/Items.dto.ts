import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { IItem } from '../interfaces/type/IItem.interface';

export class ItemDto implements IItem {
  @ApiProperty()
  @IsString()
  productId: string;
  @ApiProperty()
  @IsNumber()
  quantity: number;
  @ApiProperty()
  @IsNumber()
  price: number;
}
