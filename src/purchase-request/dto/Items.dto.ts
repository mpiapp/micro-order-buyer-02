import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';
import { IItem } from '../interfaces/type/IItem.interface';

export class ItemDto implements IItem {
  @ApiProperty()
  @IsString()
  productId: string;
  @ApiProperty()
  @IsNumber()
  @Min(0)
  quantity: number;
  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;
}
