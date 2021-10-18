import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ItemPRDto } from './../../purchase-request/dto/Items.dto';
import { StatusDto } from './../../purchase-request/dto/Status.dto';

export class PRMoveDto {
  @ApiProperty()
  @IsNotEmpty()
  code: string;
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;
  @ApiProperty()
  @IsNotEmpty()
  buyerId: string;
  @ApiProperty()
  @IsNotEmpty()
  addressId: string;
  @ApiProperty()
  @IsArray()
  items?: ItemPRDto[];
  @ApiProperty()
  @IsNumber()
  @Min(0)
  total: number;
  @ApiProperty()
  @IsArray()
  statuses: StatusDto[];
  @ApiProperty()
  @IsNotEmpty()
  createdBy: string;
}
