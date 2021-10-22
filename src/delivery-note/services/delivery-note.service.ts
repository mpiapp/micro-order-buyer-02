import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICreateDeliveryNote } from '../interfaces/services/CreateDeliveryNoteService.interface';
import { IReadDeliveryNote } from '../interfaces/services/ReadDeliveryNoteService.interface';
import { IUpdateDeliveryNote } from '../interfaces/services/UpdateDeliveryNoteService.interface';
import { IDnCreate } from '../interfaces/type/dn-create.type';
import { TPaginate } from '../interfaces/type/dn-paginate.type';
import { IDnUpdate } from '../interfaces/type/dn-update.type';
import { DN, DNDocument } from '../schemas/delivery-note.schema';

@Injectable()
export class DeliveryNoteService
  implements ICreateDeliveryNote, IReadDeliveryNote, IUpdateDeliveryNote
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

  async getAll(vendor: string): Promise<DN[]> {
    return this.model.find({ vendorId: vendor });
  }

  async getCount(SearchCode: string): Promise<number> {
    const getDoc = await this.model.find({
      code: { $regex: SearchCode, $options: 'i' },
    });
    return getDoc.length > 0 ? getDoc.length : 0;
  }

  async getPaginate(params: TPaginate): Promise<any> {
    const { vendorId, skip, limit } = params;
    return this.model.aggregate([
      {
        $match: {
          vendorId: vendorId,
        },
      },
      {
        $facet: {
          metadata: [
            {
              $count: 'total',
            },
          ],
          data: [
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
          ],
        },
      },
    ]);
  }

  async update(id: string, params: IDnUpdate): Promise<DN> {
    return this.model.findByIdAndUpdate(id, params);
  }
}
