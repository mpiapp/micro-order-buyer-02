import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type OrderDocument = Order & mongoose.Document;

@Schema()
class File {
  @Prop()
  url: string;
  @Prop()
  uploader: string;
  @Prop()
  date: Date;
}

@Schema()
class ApprovalPayment {
  @Prop()
  nominal: number;
  @Prop()
  name: string;
  @Prop()
  date: Date;
}

@Schema()
class ProofPayment {
  @Prop(File)
  file: File;
  @Prop(ApprovalPayment)
  approval: ApprovalPayment;
}

@Schema()
class Status {
  @Prop()
  name: string;
  @Prop()
  timestamp: Date;
  @Prop()
  note?: string;
  @Prop()
  user?: string;
}

@Schema()
class Item {
  @Prop()
  productId: string;
  @Prop()
  quantity: number;
  @Prop()
  retail_price: number;
  @Prop()
  vendorId: string;
  @Prop()
  vendor_name: string;
  @Prop()
  name: string;
  @Prop()
  sku: string;
  @Prop()
  slug: string;
  @Prop()
  brand: string;
  @Prop()
  images_product: string;
  @Prop({
    type: [
      {
        rack: { type: String },
        bin: { type: String },
        level: { type: String },
      },
    ],
  })
  storage: {
    rack: string;
    bin: string;
    level: string;
  };
  @Prop({
    type: [
      {
        width: { type: Number },
        length: { type: Number },
        height: { type: Number },
        weight: { type: Number },
      },
    ],
  })
  dimension: {
    width: number;
    length: number;
    height: number;
    weight: number;
  };
  @Prop({
    type: [
      {
        sub_product_id: { type: String },
        slug: { type: String },
        variance: { type: String },
        image_sub_product: { type: [String] },
        made_date: { type: Date },
        expired_date: { type: Date },
        quantity: { type: Number },
      },
    ],
  })
  sub_products: {
    sub_product_id: string;
    slug: string;
    variance: string;
    image_sub_product: string[];
    made_date: Date;
    expired_date: Date;
    quantity: number;
  };
  @Prop()
  categories: string;
  @Prop()
  measurement: string;
  @Prop({
    type: [
      {
        name: { type: String },
        long: { type: String },
        lat: { type: String },
      },
    ],
  })
  warehouse: {
    name: string;
    long: string;
    lat: string;
  };
  @Prop({
    type: [
      {
        name: { type: String },
        value: { type: Number },
      },
    ],
  })
  payment_term: {
    name: string;
    value: number;
  };
  @Prop()
  discount_price: number;
  @Prop()
  discount: number;
  @Prop()
  sub_total: number;
  @Prop()
  quantity_original?: number;
  @Prop()
  retail_price_original?: number;
  @Prop()
  sub_total_original?: number;
  @Prop()
  discount_price_original?: number;
  @Prop()
  note?: string;
  @Prop([Status])
  statuses: [Status];
  @Prop()
  updated?: boolean;
}

@Schema()
class Package {
  @Prop()
  code_package: string;
  @Prop()
  payment_terms?: string;
  @Prop()
  total: number;
  @Prop()
  tax?: number;
  @Prop([Item])
  items: [Item];
  @Prop([Status])
  statuses: [Status];
}

@Schema()
class Vendor {
  @Prop()
  _id: string;
  @Prop()
  name: string;
  @Prop()
  address: string;
  @Prop()
  phone: string;
}

@Schema()
class Buyer {
  @Prop()
  _id: string;
  @Prop()
  name: string;
  @Prop()
  address: string;
  @Prop()
  phone: string;
}

@Schema()
class ShippingAddress {
  @Prop()
  _id: string;
  @Prop()
  address: string;
  @Prop()
  zip_code: number;
  @Prop()
  phone: string;
}

@Schema()
class Vendors {
  @Prop()
  code_po: string;
  @Prop(Vendor)
  vendor: Vendor;
  @Prop()
  down_payment?: number;
  @Prop(ProofPayment)
  proof_of_advance_payment: ProofPayment;
  @Prop([Package])
  packages: [Package];
  @Prop([Status])
  statuses: [Status];
}

@Schema()
class Approval {
  @Prop()
  name: string;
  @Prop()
  note: string;
  @Prop()
  timestamp: Date;
}

@Schema({ timestamps: true })
export class Order {
  @Prop()
  id: string;
  @Prop({ unique: true, required: true, index: true })
  code_pr: string;
  @Prop({ type: Date })
  date: Date;
  @Prop(Buyer)
  buyer: Buyer;
  @Prop(ShippingAddress)
  address: ShippingAddress;
  @Prop([Vendors])
  vendors: [Vendors];
  @Prop({ min: 0, required: true })
  total: number;
  @Prop([Status])
  statuses: [Status];
  @Prop(Approval)
  approval: Approval;
  @Prop({ default: false })
  isDeleted: boolean;
  @Prop({ type: String, required: true })
  createdBy: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
