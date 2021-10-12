import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TemplateDocument = Template & mongoose.Document;

@Schema({ timestamps: true })
export class Template {
  @Prop()
  id: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  buyerId: string;
  @Prop({ required: true })
  items: string[];
  @Prop({
    type: [{ name: { type: String }, timestamp: { type: Date } }],
  })
  statuses: {
    name: string;
    timestamp: Date;
  }[];
  @Prop({ default: false })
  isDeleted: boolean;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  createdBy: string;
}

const TemplateSchema = SchemaFactory.createForClass(Template);

TemplateSchema.index({ createdBy: 'text' });

export { TemplateSchema };
