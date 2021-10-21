import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPaginate } from './../../package/interfaces/type/Paginate.interface';
import {
  PO,
  PODocument,
} from '../../purchase-order/schemas/purchase-order.schema';
import { IOrderPaginateService } from '../interfaces/services/orders.paginate.interface';

@Injectable()
export class OrderPaginateService implements IOrderPaginateService {
  constructor(@InjectModel(PO.name) private model: Model<PODocument>) {}

  async paginate(params: IPaginate): Promise<any> {
    const { vendorId, status, skip, limit } = params;

    return this.model.aggregate([
      {
        $addFields: {
          'vendors._id': '$_id',
        },
      },
      {
        $unwind: '$vendors',
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                buyerId: '$buyerId',
                addressId: '$addressId',
                date: '$date',
              },
              '$vendors',
            ],
          },
        },
      },
      {
        $addFields: {
          lastStatus: {
            $last: '$statuses.name',
          },
        },
      },
      {
        $match: {
          vendorId: vendorId,
          lastStatus: status,
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
}
