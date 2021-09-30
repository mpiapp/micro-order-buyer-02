import { IsArray } from 'class-validator';
import { Product } from './Product.dto';
import { Status } from './Status.dto';

export class PurchaseRequestUpdateDto {
  @IsArray()
  status: Status[];
  @IsArray()
  products: Product[];
}
