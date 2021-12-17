import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class ReferenceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  packageId: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code_po: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code_package: string;
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date_order: Date;
}
