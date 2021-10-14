import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PRDocument = PR & mongoose.Document;

@Schema({ timestamps: true, versionKey: false })
export class PR {
  @Prop({ type: String })
  id: string;
  @Prop({ unique: true, required: true, index: true })
  code: string;
  @Prop({ type: Date })
  date: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  buyerId: string;
  @Prop({
    type: [
      {
        productId: { type: String },
        quantity: { type: Number },
        price: { type: Number },
      },
    ],
  })
  items: {
    productId: string;
    quantity: number;
    price: number;
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

export const PRSchema = SchemaFactory.createForClass(PR);
