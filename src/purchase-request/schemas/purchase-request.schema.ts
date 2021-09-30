import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PRDocument = PR & mongoose.Document;

@Schema()
export class PR {
  @Prop()
  id: string;
  @Prop({ required: true })
  user_id: string;
  @Prop({ required: true })
  buyer_id: string;
  @Prop({ type: Date })
  date: Date;
  @Prop({
    type: [
      {
        quantity: { type: Number },
        product_id: { type: String },
        price: { type: Number },
      },
    ],
  })
  products: {
    product_id: string;
    quantity: number;
    price: number;
  }[];
  @Prop({
    type: [{ name: { type: String }, next: { type: [String] } }],
  })
  status: {
    name: string;
    next: string[];
  };
  @Prop({ default: false })
  isDeleted: boolean;
}

export const PRSchema = SchemaFactory.createForClass(PR);
