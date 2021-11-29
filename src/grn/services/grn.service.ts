import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DN,
  DNDocument,
} from './../../delivery-note/schemas/delivery-note.schema';
import { TGrnPaginate } from '../interfaces/types/grn-paginate.type';
import { TGrnUpdate } from '../interfaces/types/grn-update.type';
import { IStatus } from './../../purchase-request/interfaces/type/IStatus.interface';

@Injectable()
export class GrnService {
  constructor(
    @InjectModel(DN.name) private readonly grnModel: Model<DNDocument>,
  ) {}

  async getAll(id: string): Promise<DN[]> {
    return this.grnModel.find({ buyerId: id, isDeleted: false });
  }

  async getOne(id: string): Promise<DN> {
    return this.grnModel.findById(id);
  }

  async getPaginate(params: TGrnPaginate): Promise<any> {
    const { keyId, skip, limit } = params;
    return this.grnModel.aggregate([
      {
        $match: {
          buyerId: keyId,
          isDeleted: false,
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

  async updateGRN(id: string, params: TGrnUpdate): Promise<DN> {
    return this.grnModel.findByIdAndUpdate(id, {
      $set: params,
    });
  }

  async getCount(SearchCode: string): Promise<number> {
    const getDoc = await this.grnModel.find({
      code: { $regex: SearchCode, $options: 'i' },
    });
    return getDoc.length > 0 ? getDoc.length : 0;
  }

  async rejectGRN(id: string, params: IStatus): Promise<DN> {
    return this.grnModel.findByIdAndUpdate(id, {
      $push: { statuses: params },
    });
  }
}
