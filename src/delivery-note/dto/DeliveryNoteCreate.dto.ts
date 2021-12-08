import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';
import { ItemPRDto } from 'src/purchase-request/dto/Items.dto';
import { IStatus } from 'src/purchase-request/interfaces/type/IStatus.interface';
import {
  DNBuyer,
  DNDelivery,
  DNReference,
  DNVendor,
  IDnCreate,
} from '../interfaces/type/dn-create.type';

export class DeliveryNoteCreateDto implements IDnCreate {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code_po: string;
  @ApiProperty()
  @IsObject()
  buyer: DNBuyer;
  @ApiProperty()
  @IsObject()
  delivery: DNDelivery;
  @ApiProperty()
  @IsObject()
  vendor: DNVendor;
  @ApiProperty()
  @IsObject()
  reference_doc: DNReference;
  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;
  @ApiProperty()
  @IsArray()
  items: ItemPRDto[];
  @ApiProperty()
  statuses: IStatus;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
