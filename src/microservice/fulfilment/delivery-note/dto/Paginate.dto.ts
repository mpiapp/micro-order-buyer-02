import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { TBasePaginate } from 'src/config/type/BasePaginate.type';

export class DNPaginateDto implements TBasePaginate {
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
