import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';
import { Items } from './../../items/dto/Items.dto';

export class ItemPRDto extends Items {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;
}
