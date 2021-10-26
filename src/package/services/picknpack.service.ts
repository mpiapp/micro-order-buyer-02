import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PO,
  PODocument,
} from './../../purchase-order/schemas/purchase-order.schema';
import * as mongoose from 'mongoose';
import { IPicknPackPackage } from '../interfaces/type/PicknPack.Package.interface';

@Injectable()
export class PicknPackService {
  constructor(
    @InjectModel(PO.name) private readonly model: Model<PODocument>,
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
