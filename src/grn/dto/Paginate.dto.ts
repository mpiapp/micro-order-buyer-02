import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { TGrnPaginate } from './../interfaces/types/grn-paginate.type';

export class GrnPaginateDto implements TGrnPaginate {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  keyId: string;
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
