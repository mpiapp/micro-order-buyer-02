import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type DNDocument = DN & mongoose.Document;

@Schema({ timestamps: true })
export class DN {
  @Prop()
  id: string;
  @Prop({ unique: true, required: true, index: true, type: String })
  code: string;
  @Prop({ type: String })
  code_grn?: string;
  @Prop({ type: Date })
  date: Date;
  @Prop({ type: String, required: true })
  buyerId: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  addressId: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  vendorId: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  orderId: string;
  @Prop({ type: String })
  awb?: string;
  @Prop({
    type: [
      {
        productId: { type: String },
        quantity: { type: Number },
        received: { type: Number },
        price: { type: Number },
      },
    ],
  })
  items: {
    productId: string;
    quantity: number;
    received?: number;
    price: number;
  }[];
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
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  receivedUserId?: string;
}

export const DNSchema = SchemaFactory.createForClass(DN);
