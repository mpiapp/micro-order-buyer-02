import { ApiProperty } from '@nestjs/swagger';
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
  timestamp: Date;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
