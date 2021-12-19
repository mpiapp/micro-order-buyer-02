import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TemplateDocument = Template & mongoose.Document;

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
}

@Schema()
class Package {
  @Prop()
  total: number;
  @Prop([Item])
  items: [Item];
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
class Vendors {
  @Prop()
  vendor: Vendor;
  @Prop([Package])
  packages: [Package];
}

@Schema({ timestamps: true })
export class Template {
  @Prop({ type: String })
  id: string;
  @Prop({ type: String, required: true })
  buyerId: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop([Vendors])
  vendors: [Vendors];
  @Prop({ min: 0, required: true })
  total: number;
  @Prop({ default: false })
  isDeleted: boolean;
  @Prop({ type: String, required: true, index: true })
  createdBy: string;
}

const TemplateSchema = SchemaFactory.createForClass(Template);

TemplateSchema.index({ createdBy: 'text' });

export { TemplateSchema };
