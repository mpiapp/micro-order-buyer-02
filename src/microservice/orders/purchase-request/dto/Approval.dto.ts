import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ApprovalDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
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
  note: string;
}
