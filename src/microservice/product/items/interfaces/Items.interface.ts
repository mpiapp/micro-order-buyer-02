export interface ItemsInterface {
  productId: string;
  vendorId: string;
  vendor_name: string;
  name: string;
  sku: string;
  slug: string;
  brand: string;
  images_product: string;
  storage: IStorage;
  quantity: number;
  dimension: IDimension;
  sub_products: ISubProduct;
  categories: string;
  measurement: string;
  author: string;
  warehouse: IWarehouse;
  price: number;
  payment_term: IPaymentTerm[];
}

export interface IPaymentTerm {
  name: string;
  value: number;
}

export interface IWarehouse {
  name: string;
  long: string;
  lat: string;
}

export interface ISubProduct {
  sub_product_id: string;
  slug: string;
  variance: string;
  image_sub_product: string[];
  made_date: Date;
  expired_date: Date;
  quantity: number;
}

export interface IDimension {
  width: number;
  length: number;
  height: number;
  weight: number;
}

export interface IStorage {
  rack: string;
  bin: string;
  level: string;
}
