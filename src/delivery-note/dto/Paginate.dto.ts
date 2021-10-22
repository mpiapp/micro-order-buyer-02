import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { TPaginate } from '../interfaces/type/dn-paginate.type';

export class DNPaginateDto implements TPaginate {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vendorId: string;
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
