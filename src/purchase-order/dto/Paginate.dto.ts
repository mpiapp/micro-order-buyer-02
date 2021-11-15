import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class POPaginateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  keyId: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  limit: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  skip: number;
}
