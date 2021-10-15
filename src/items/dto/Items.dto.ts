import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ItemsInterface } from '../interfaces/Items.interface';

export class Items implements ItemsInterface {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productId: string;
  @ApiProperty()
  @IsNumber()
  @Min(0)
  quantity: number;
}
