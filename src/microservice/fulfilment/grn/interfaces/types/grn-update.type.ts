import {
  DNReference,
  DNVendor,
} from './../../../delivery-note/interfaces/type/dn-create.type';

export type TGrnUpdate = {
  vendor: DNVendor;
  received: GRNReceived;
  reference_doc: DNReference;
  items: {
    productId: string;
    quantity: number;
    received: number;
    price: number;
  }[];
};

export type GRNReceived = {
  code: string;
  date: Date;
  name: string;
};
