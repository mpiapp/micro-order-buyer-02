import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { TBuyer } from '../type/Buyer.type';

export class BuyerDto implements TBuyer {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  _id: string;
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(100)
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;
}
