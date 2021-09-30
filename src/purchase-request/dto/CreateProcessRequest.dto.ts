import { IsArray, IsDate, IsNotEmpty, MaxLength } from 'class-validator';
import { Product } from './Product.dto';
import { Status } from './Status.dto';

export class PurchaseRequestCreateDto {
  @IsNotEmpty()
  @MaxLength(20)
  id: string;
  @IsNotEmpty()
  user_id: string;
  @IsNotEmpty()
  buyer_id: string;
  @IsDate()
  date: Date;
  @IsArray()
  status: Status[];
  @IsArray()
  products: Product[];
}
