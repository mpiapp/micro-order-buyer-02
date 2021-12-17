import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DeliveryNote,
  DNDocument,
} from './../../../../database/schema/delivery-note.schema';
import { IStatus } from 'src/microservice/orders/purchase-request/interfaces/type/IStatus.interface';
import { TGrnPaginate } from './../interfaces/types/grn-paginate.type';
import { TGrnUpdate } from './../interfaces/types/grn-update.type';

@Injectable()
export class GrnService {
  constructor(
    @InjectModel(DeliveryNote.name)
    private readonly grnModel: Model<DNDocument>,
  ) {}

  async getAll(id: string): Promise<DeliveryNote[]> {
    return this.grnModel
      .find({ 'buyer._id': id, isDeleted: false })
      .sort({ createdAt: -1 });
  }

  async getOne(id: string): Promise<DeliveryNote> {
    return this.grnModel.findById(id);
  }

  async getPaginate(params: TGrnPaginate): Promise<any> {
    const { keyId, skip, limit } = params;
    return this.grnModel.aggregate([
      {
        $match: {
          'buyer._id': keyId,
          isDeleted: false,
        },
      },
      { $sort: { createdAt: -1 } },
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

  async updateGRN(id: string, params: TGrnUpdate): Promise<DeliveryNote> {
    const { received, items, vendor } = params;
    return this.grnModel.findOneAndUpdate(
      {
        $and: [
          {
            'reference_doc.packageId': id,
          },
          {
            'vendor._id': vendor._id,
          },
        ],
      },
      {
        $set: {
          received: received,
          items: items,
        },
      },
    );
  }

  async getCount(SearchCode: string): Promise<number> {
    const getDoc = await this.grnModel.find({
      'received.code': { $regex: SearchCode, $options: 'i' },
    });
    return getDoc.length > 0 ? getDoc.length : 0;
  }

  async rejectGRN(id: string, params: IStatus): Promise<DeliveryNote> {
    return this.grnModel.findByIdAndUpdate(id, {
      $push: { statuses: params },
    });
  }
}
