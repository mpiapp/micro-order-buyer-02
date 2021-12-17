import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { IPaginate } from './../interfaces/type/Paginate.interface';

export class PaginateDto implements IPaginate {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vendorId: string;
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
