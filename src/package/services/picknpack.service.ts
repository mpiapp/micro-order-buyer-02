import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { IPicknPackPackage } from '../interfaces/type/PicknPack.Package.interface';
import { Order, OrderDocument } from './../../database/schema/orders.schema';

@Injectable()
export class PicknPackService {
  constructor(
    @InjectModel(Order.name) private readonly model: Model<OrderDocument>,
  ) {}

  async pickPackage(params: IPicknPackPackage): Promise<any> {
    const { id, code, items, statuses } = params;

    return this.model.updateOne(
      {
        $and: [
          {
            'vendors.packages._id': new mongoose.Types.ObjectId(id),
          },
        ],
      },
      {
        $set: {
          'vendors.$.packages.$.pick_number': code,
          'vendors.$.packages.$.items': items,
          'vendors.$.packages.$.total': items,
        },
        $push: { 'vendors.$.packages.statuses': statuses },
      },
    );
  }

  async packPackage(params: IPicknPackPackage): Promise<any> {
    const { id, code, items, statuses } = params;

    return this.model.updateOne(
      {
        $and: [
          {
            'vendors.packages._id': new mongoose.Types.ObjectId(id),
          },
        ],
      },
      {
        $set: {
          'vendors.$.packages.$.pack_number': code,
          'vendors.$.packages.$.items': items,
        },
        $push: { 'vendors.$.packages.statuses': statuses },
      },
    );
  }
}
