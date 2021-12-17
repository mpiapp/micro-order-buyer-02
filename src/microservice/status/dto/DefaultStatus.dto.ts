import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { TStatusDefault } from '../interfaces/type/StatusDefault.type';
import { StatusDto } from './../../../config/dto/status.dto';

export class DefaultStatusDto implements TStatusDefault {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
  @ApiProperty()
  @IsObject()
  status: StatusDto;
}
