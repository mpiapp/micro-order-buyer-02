import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TemplateDocument = Template & mongoose.Document;

@Schema({ timestamps: true })
export class Template {
  @Prop({ type: String })
  id: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  buyerId: string;
  @Prop({
    type: [
      {
        productId: { type: String },
        quantity: { type: Number },
      },
    ],
  })
  items: {
    productId: string;
    quantity: number;
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
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  createdBy: string;
  @Prop()
  createdAt?: Date;
}

const TemplateSchema = SchemaFactory.createForClass(Template);

TemplateSchema.index({ createdBy: 'text' });

export { TemplateSchema };
