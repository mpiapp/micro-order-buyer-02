import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';
import { BuyerDto } from './../../../../config/dto/buyer.dto';
import { VendorDto } from './../../../../config/dto/vendor.dto';
import { ItemPRDto } from './../../../../microservice/orders/purchase-request/dto/Items.dto';
import { IStatus } from './../../../orders/purchase-request/interfaces/type/IStatus.interface';
import { IDnCreate } from '../interfaces/type/dn-create.type';
import { DeliveryShippingDto } from './Delivery.dto';
import { ReferenceDto } from './Reference.dto';

export class DeliveryNoteCreateDto implements IDnCreate {
  @ApiProperty()
  @IsObject()
  buyer: BuyerDto;
  @ApiProperty()
  @IsObject()
  delivery: DeliveryShippingDto;
  @ApiProperty()
  @IsObject()
  vendor: VendorDto;
  @ApiProperty()
  @IsObject()
  reference_doc: ReferenceDto;
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
