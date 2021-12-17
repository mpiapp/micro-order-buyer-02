import { VendorOrderDto } from 'src/config/dto/vendor-order.dto';
import { TShippingAddress } from './../../../../../config/type/AddressShipping.type';
import { TBuyer } from './../../../../../config/type/Buyer.type';

export type CreatePurchaseRequest = {
  code_pr: string;
  date: Date;
  buyer: TBuyer;
  address: TShippingAddress;
  vendors: VendorOrderDto[];
  total: number;
  createdBy: string;
};
