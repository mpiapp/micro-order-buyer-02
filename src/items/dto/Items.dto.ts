import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsString, Min } from 'class-validator';
import {
  IDimension,
  IPaymentTerm,
  IStorage,
  ISubProduct,
  ItemsInterface,
  IWarehouse,
} from '../interfaces/Items.interface';

export class Items implements ItemsInterface {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productId: string;
  @ApiProperty()
  @IsNumber()
  @Min(0)
  quantity: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vendorId: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vendor_name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sku: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  brand: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  images_product: string;
  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  storage: IStorage;
  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  dimension: IDimension;
  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  sub_products: ISubProduct;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  categories: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  measurement: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  author: string;
  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  warehouse: IWarehouse;
  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;
  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  payment_term: IPaymentTerm;
}
