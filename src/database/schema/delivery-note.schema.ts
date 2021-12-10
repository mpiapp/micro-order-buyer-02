import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type DNDocument = DeliveryNote & mongoose.Document;

@Schema()
class Item {
  @Prop()
  productId: string;
  @Prop()
  name: string;
  @Prop()
  sku: string;
  @Prop()
  brand: string;
  @Prop()
  categories: string;
  @Prop()
  quantity: number;
  @Prop()
  received?: number;
  @Prop()
  price: number;
  @Prop()
  measurement: string;
}

@Schema()
class Status {
  @Prop()
  name: string;
  @Prop()
  timestamp: Date;
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
  address: string;
  @Prop()
  zip_code: number;
  @Prop()
  phone: string;
}

@Schema()
class Delivery {
  @Prop({ unique: true, required: true, index: true, type: String })
  code: string;
  @Prop()
  despatch_date: Date;
  @Prop()
  awb?: string;
  @Prop()
  method?: string;
  @Prop(ShippingAddress)
  shipping_address: ShippingAddress;
}

@Schema()
class Received {
  @Prop({ unique: true, required: true, index: true, type: String })
  code: string;
  @Prop()
  date: Date;
  @Prop()
  name: string;
}

@Schema()
class ReferenceDocument {
  @Prop()
  packageId: string;
  @Prop()
  code_po: string;
  @Prop()
  code_package: string;
  @Prop()
  date_order: Date;
}

@Schema({ timestamps: true })
export class DeliveryNote {
  @Prop()
  id: string;
  @Prop(Buyer)
  buyer: Buyer;
  @Prop(Vendor)
  vendor: Vendor;
  @Prop(ReferenceDocument)
  reference_doc: ReferenceDocument;
  @Prop(Delivery)
  delivery: Delivery;
  @Prop(Received)
  received?: Received;
  @Prop([Item])
  items: [Item];
  @Prop([Status])
  statuses: [Status];
  @Prop({ default: false })
  isDeleted: boolean;
  @Prop({ type: String, required: true })
  createdBy: string;
}

export const DNSchema = SchemaFactory.createForClass(DeliveryNote);
