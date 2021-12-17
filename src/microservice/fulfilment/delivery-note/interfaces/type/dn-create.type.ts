import { IPurchaseOrderItem } from 'src/microservice/orders/purchase-order/interfaces/type/IPurchaseOrderItem.interface';
import { IStatus } from 'src/microservice/orders/purchase-request/interfaces/type/IStatus.interface';

export type IDnCreate = {
  date: Date;
  buyer: DNBuyer;
  vendor: DNVendor;
  delivery: DNDelivery;
  reference_doc: DNReference;
  items: IPurchaseOrderItem[];
  statuses: IStatus;
  createdBy: string;
};

export type DNVendor = {
  _id: string;
  name: string;
  address: string;
  phone: string;
};

export type DNBuyer = {
  _id: string;
  name: string;
  address: string;
  phone: string;
};

export type DNDelivery = {
  code: string;
  despatch_date: Date;
  awb?: string;
  method?: string;
  shipping_address: DNShippingAddress;
};

export type DNShippingAddress = {
  address: string;
  zip_code: number;
  phone: string;
};

export type DNReference = {
  packageId: string;
  code_po: string;
  code_package: string;
  date_order: Date;
};
