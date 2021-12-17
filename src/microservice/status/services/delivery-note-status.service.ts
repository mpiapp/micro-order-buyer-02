import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TStatusDefault } from './../interfaces/type/StatusDefault.type';
import {
  DeliveryNote,
  DNDocument,
} from './../../../database/schema/delivery-note.schema';

@Injectable()
export class DeliveryNoteStatusService {
  constructor(
    @InjectModel(DeliveryNote.name) private model: Model<DNDocument>,
  ) {}

  async pushStatus(params: TStatusDefault): Promise<DeliveryNote> {
    const { id, ...update } = params;
    return this.model.findByIdAndUpdate(id, { $push: { statuses: update } });
  }
}
