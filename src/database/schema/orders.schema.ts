import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type OrderDocument = Order & mongoose.Document;

@Schema({ timestamps: true })
export class Order {
  @Prop()
  id: string;
  @Prop({ unique: true, required: true, index: true })
  code_pr: string;
  @Prop({ type: Date })
  date: Date;
  @Prop({ type: String, required: true })
  buyerId: string;
  @Prop({ type: String, required: true })
  addressId: string;
  @Prop({
    type: [
      {
        code_po: { type: String },
        vendorId: { type: String },
        packages: {
          type: [
            {
              code_package: { type: String },
              items: {
                type: [
                  {
                    productId: { type: String },
                    quantity: { type: Number },
                    price: { type: Number },
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
              },
              statuses: {
                type: [{ name: { type: String }, timestamp: { type: Date } }],
              },
              payment_terms: { type: String },
              tax: { type: Number },
              total: { type: Number },
              down_payment: { type: Number },
              proof_of_advance_payment: {
                type: [
                  {
                    file: {
                      type: [
                        {
                          url: { type: String },
                          uploader: { type: String },
                          date: { type: Date },
                        },
                      ],
                    },
                    approval: {
                      type: [
                        {
                          nominal: { type: Number },
                          name: { type: String },
                          date: { type: Date },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  })
  vendors: {
    code_po: string;
    vendorId: string;
    packages: {
      code_package: string;
      payment_terms?: string;
      total: number;
      tax?: number;
      down_payment?: number;
      proof_of_advance_payment?: {
        file: {
          url: string;
          uploader: string;
          date: Date;
        };
        approval?: {
          name: string;
          nominal: number;
          date: Date;
        };
      };
      items: {
        productId: string;
        quantity: number;
        price: number;
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
      statuses: {
        name: string;
        timestamp: Date;
      }[];
    };
  }[];
  @Prop({ min: 0, required: true })
  total: number;
  @Prop({
    type: [
      {
        name: { type: String },
        timestamp: { type: Date },
        note: { type: String },
      },
    ],
  })
  statuses: {
    name: string;
    timestamp: Date;
    note?: string;
  }[];
  @Prop({
    type: [
      {
        name: { type: String },
        note: { type: String },
        timestamp: { type: Date },
      },
    ],
  })
  approval: {
    name: string;
    note: string;
    timestamp: Date;
  };
  @Prop({ default: false })
  isDeleted: boolean;
  @Prop({ type: String, required: true })
  createdBy: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
