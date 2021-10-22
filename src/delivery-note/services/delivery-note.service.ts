import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICreateDeliveryNote } from '../interfaces/services/CreateDeliveryNoteService.interface';
import { IReadDeliveryNote } from '../interfaces/services/ReadDeliveryNoteService.interface';
import { IDnCreate } from '../interfaces/type/dn-create.type';
import { DN, DNDocument } from '../schemas/delivery-note.schema';

@Injectable()
export class DeliveryNoteService
  implements ICreateDeliveryNote, IReadDeliveryNote
{
  constructor(
    @InjectModel(DN.name) private readonly model: Model<DNDocument>,
  ) {}

  async create(params: IDnCreate): Promise<DN> {
    return this.model.create(params);
  }

  async getOne(id: string): Promise<DN> {
    return this.model.findById(id);
  }

  async getAll(vendorId: string): Promise<DN[]> {
    return this.model.find({ vendorId: vendorId });
  }

  async getCount(SearchCode: string): Promise<number> {
    const getDoc = await this.model.find({
      code: { $regex: SearchCode, $options: 'i' },
    });
    return getDoc.length > 0 ? getDoc.length : 0;
  }
}
