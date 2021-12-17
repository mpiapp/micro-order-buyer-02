import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject } from 'class-validator';
import { VendorDto } from 'src/config/dto/vendor.dto';
import { ReferenceDto } from '../../delivery-note/dto/Reference.dto';
import { TGrnUpdate } from '../interfaces/types/grn-update.type';
import { GRNItems } from './Items.dto';
import { GRNReceivedDto } from './Received.dto';

export class GRNUpdateDto implements TGrnUpdate {
  @ApiProperty()
  @IsObject()
  received: GRNReceivedDto;
  @ApiProperty()
  @IsObject()
  vendor: VendorDto;
  @ApiProperty()
  @IsObject()
  reference_doc: ReferenceDto;
  @ApiProperty()
  @IsArray()
  items: GRNItems[];
}
