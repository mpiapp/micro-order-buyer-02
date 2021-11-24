import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TStatus } from '../type/status.type';

export class StatusDto implements TStatus {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id?: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  timestamp: Date;
  @ApiProperty()
  @IsString()
  @IsOptional()
  message?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  userId?: string;
}
