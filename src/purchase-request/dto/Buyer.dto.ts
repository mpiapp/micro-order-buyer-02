import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IBuyer } from '../interfaces/type/IBuyer.interface';

export class BuyerDto implements IBuyer {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  buyerId: string;
}
