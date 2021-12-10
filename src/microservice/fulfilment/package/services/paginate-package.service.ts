import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Order,
  OrderDocument,
} from './../../../../database/schema/orders.schema';
import { IPaginate } from '../interfaces/type/Paginate.interface';

@Injectable()
export class PaginatePackageService {
  constructor(
    @InjectModel(Order.name) private readonly model: Model<OrderDocument>,
  ) {}

  async paginate(params: IPaginate): Promise<any> {
    const { vendorId, status, skip, limit } = params;

    return this.model.aggregate([
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
                vendor_name: '$vendor_name',
                date: '$date',
                code_po: '$code_po',
              },
              '$vendors',
            ],
          },
        },
      },
      {
        $unwind: '$packages',
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                buyerId: '$buyerId',
                addressId: '$addressId',
                vendorId: '$vendorId',
                vendor_name: '$vendor_name',
                date: '$date',
                code_po: '$code_po',
              },
              '$packages',
            ],
          },
        },
      },
      {
        $addFields: {
          lastStatus: {
            $last: '$statuses.name',
          },
          grand_total: {
            $sum: '$items.sub_total',
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
