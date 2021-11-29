import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TemplateDocument = Template & mongoose.Document;

@Schema({ timestamps: true })
export class Template {
  @Prop({ type: String })
  id: string;
  @Prop({ type: String, required: true })
  buyerId: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({
    type: [
      {
        productId: { type: String },
        quantity: { type: Number },
        vendorId: { type: String },
        vendor_name: { type: String },
        name: { type: String },
        sku: { type: String },
        slug: { type: String },
        brand: { type: String },
        images_product: { type: String },
        storage: {
          type: [
            {
              rack: Number,
              bin: Number,
              level: Number,
            },
          ],
        },
        dimension: {
          type: [
            {
              width: Number,
              length: Number,
              height: Number,
              weight: Number,
            },
          ],
        },
        sub_products: {
          type: [
            {
              sub_product_id: String,
              slug: String,
              variance: String,
              image_sub_product: [String],
              made_date: Date,
              expired_date: Date,
              quantity: Number,
            },
          ],
        },
        categories: { type: String },
        measurement: { type: String },
        author: { type: String },
        warehouse: {
          type: [
            {
              name: String,
              long: String,
              lat: String,
            },
          ],
        },
        payment_term: {
          type: [
            {
              name: String,
              value: Number,
            },
          ],
        },
      },
    ],
  })
  items: {
    productId: string;
    quantity: number;
    vendorId: string;
    vendor_name: string;
    name: string;
    sku: string;
    slug: string;
    brand: string;
    images_product: string;
    storage: {
      rack: number;
      bin: number;
      level: number;
    };
    dimension: {
      width: number;
      length: number;
      height: number;
      weight: number;
    };
    sub_products: {
      sub_product_id: string;
      slug: string;
      variance: string;
      image_sub_product: string[];
      made_date: Date;
      expired_date: Date;
      quantity: number;
    };
    categories: string;
    measurement: string;
    author: string;
    warehouse: {
      name: string;
      long: string;
      lat: string;
    };
    payment_term: {
      name: string;
      value: number;
    };
  }[];
  @Prop({
    type: [
      { name: { type: String }, timestamp: { type: Date, default: Date.now } },
    ],
  })
  statuses: {
    name: string;
    timestamp: Date;
  }[];
  @Prop({ default: false })
  isDeleted: boolean;
  @Prop({ type: String, required: true, index: true })
  createdBy: string;
}

const TemplateSchema = SchemaFactory.createForClass(Template);

TemplateSchema.index({ createdBy: 'text' });

export { TemplateSchema };
