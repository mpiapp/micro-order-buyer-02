import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PODocument = PO & mongoose.Document;

@Schema({ timestamps: true })
export class PO {
  @Prop()
  id: string;
  @Prop({ unique: true, required: true, index: true })
  code: string;
  @Prop({ type: Date })
  date: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  buyerId: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
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
                  },
                ],
              },
              statuses: {
                type: [{ name: { type: String }, timestamp: { type: Date } }],
              },
            },
          ],
        },
        payment_terms: { type: [String] },
        tax: { type: Number },
        total: { type: Number },
        statuses: {
          type: [{ name: { type: String }, timestamp: { type: Date } }],
        },
      },
    ],
  })
  vendors: {
    code_po: string;
    vendorId: string;
    items: {
      package?: string;
      productId: string;
      quantity: number;
      price: number;
    }[];
    payment_terms?: string[];
    tax?: number;
    total: number;
    statuses: {
      name: string;
      timestamp: Date;
    }[];
  }[];
  @Prop({ min: 0, required: true })
  total: number;
  @Prop({
    type: [{ name: { type: String }, timestamp: { type: Date } }],
  })
  statuses: {
    name: string;
    timestamp: Date;
  }[];
  @Prop({ default: false })
  isDeleted: boolean;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  createdBy: string;
}

export const POSchema = SchemaFactory.createForClass(PO);
