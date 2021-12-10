import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { IPickPackPackage } from './../interfaces/type/pickPack.Package.interface';
import {
  Order,
  OrderDocument,
} from './../../../../database/schema/orders.schema';

@Injectable()
export class PickPackService {
  constructor(
    @InjectModel(Order.name) private readonly model: Model<OrderDocument>,
  ) {}

  async pickPackage(params: IPickPackPackage): Promise<any> {
    const { id, code, items, statuses, total, vendorId } = params;
    return this.model.findOneAndUpdate(
      {
        $and: [
          {
            'vendors.packages._id': new mongoose.Types.ObjectId(id),
          },
        ],
      },
      {
        $set: {
          'vendors.$[arrayVendor].packages.$[arrayPackage].pick_number': code,
          'vendors.$[arrayVendor].packages.$[arrayPackage].items': items,
          'vendors.$[arrayVendor].packages.$[arrayPackage].total': total,
        },
        $push: {
          'vendors.$[arrayVendor].packages.$[arrayPackage].statuses': statuses,
        },
      },
      {
        arrayFilters: [
          { 'arrayVendor.vendorId': vendorId },
          { 'arrayPackage._id': new mongoose.Types.ObjectId(id) },
        ],
      },
    );
  }

  async packPackage(params: IPickPackPackage): Promise<any> {
    const { id, code, items, statuses, vendorId } = params;

    return this.model.findOneAndUpdate(
      {
        $and: [
          {
            'vendors.packages._id': new mongoose.Types.ObjectId(id),
          },
        ],
      },
      {
        $set: {
          'vendors.$[arrayVendor].packages.$[arrayPackage].pack_number': code,
          'vendors.$[arrayVendor].packages.$[arrayPackage].items': items,
        },
        $push: {
          'vendors.$[arrayVendor].packages.$[arrayPackage].statuses': statuses,
        },
      },
      {
        arrayFilters: [
          { 'arrayVendor.vendorId': vendorId },
          { 'arrayPackage._id': new mongoose.Types.ObjectId(id) },
        ],
      },
    );
  }
}
