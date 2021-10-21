import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PRCreateDto } from './../../purchase-request/dto/CreatePR.dto';

export class POCreateDto extends PRCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  addressId: string;
}
