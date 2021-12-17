import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class ItemChangeRejectDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  sub_total_original: number;
  @ApiProperty()
  @IsNumber()
  @Min(0)
  quantity_original: number;
  @ApiProperty()
  @IsNumber()
  @Min(0)
  retail_price_original: number;
}
