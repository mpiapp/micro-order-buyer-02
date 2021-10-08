import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { IHistory } from '../interfaces/type/Ihistory.interface';

export class HistoryDto implements IHistory {
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsString()
  message: string;
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  timestamp: Date;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
