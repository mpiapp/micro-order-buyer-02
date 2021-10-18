import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PO,
  PODocument,
} from './../../purchase-order/schemas/purchase-order.schema';
import * as mongoose from 'mongoose';
import { IPackage } from './../../purchase-order/interfaces/type/IPOPackage.interface';

@Injectable()
export class PackageService {
  constructor(
    @InjectModel(PO.name) private readonly model: Model<PODocument>,
  ) {}

  async splitPackage(
    id: string,
    vendorId: string,
    params: IPackage[],
  ): Promise<any> {
    return this.model.updateOne(
      {
        $and: [
          {
            _id: new mongoose.Types.ObjectId(id),
            'vendors.vendorId': new mongoose.Types.ObjectId(vendorId),
          },
        ],
      },
      { $set: { 'vendors.$.packages': params } },
    );
  }

  async getOrderById(id: string): Promise<any> {
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
          newRoot: '$vendors',
        },
      },
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
    ]);
  }

  async getOrder(vendorId: string, status: string): Promise<any[]> {
    return this.model.find({
      $and: [
        {
          'vendors.vendorId': new mongoose.Types.ObjectId(vendorId),
          'vendors.statuses.0.name': status,
        },
      ],
    });
  }
}
