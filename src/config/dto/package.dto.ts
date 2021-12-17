import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Items } from 'src/microservice/product/items/dto/Items.dto';
import { StatusDto } from './status.dto';

export class PackageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  code_package: string;
  @ApiProperty()
  @IsString()
  payment_terms?: string;
  @ApiProperty()
  @IsNumber()
  @Min(0)
  total: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  tax?: number;
  @ApiProperty()
  @IsArray()
  items: Items[];
  @ApiProperty()
  @IsArray()
  @ApiProperty()
  @IsArray()
  statuses: StatusDto[];
}
