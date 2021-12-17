import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class GRNReceivedDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;
  @ApiProperty()
  @IsDate()
  date: Date;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
