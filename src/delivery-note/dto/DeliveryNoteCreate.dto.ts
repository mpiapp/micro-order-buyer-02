import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ItemPRDto } from 'src/purchase-request/dto/Items.dto';
import { IStatus } from 'src/purchase-request/interfaces/type/IStatus.interface';
import { IDnCreate } from '../interfaces/type/dn-create.type';

export class DeliveryNoteCreateDto implements IDnCreate {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code_delivery_note: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  buyerId: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  addressId: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vendorId: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  orderId: string;
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
