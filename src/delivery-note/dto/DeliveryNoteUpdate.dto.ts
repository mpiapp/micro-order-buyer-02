import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IDnUpdate } from '../interfaces/type/dn-update.type';

export class DNUpdateDto implements IDnUpdate {
  @ApiProperty()
  @IsString()
  awb?: string;
  @ApiProperty()
  @IsString()
  addressId?: string;
}
