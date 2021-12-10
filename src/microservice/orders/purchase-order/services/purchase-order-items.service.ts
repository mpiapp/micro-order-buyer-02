import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Order,
  OrderDocument,
} from './../../../../database/schema/orders.schema';
import * as mongoose from 'mongoose';
import { TChangeItems } from './../interfaces/type/TChangeItems.type';

@Injectable()
export class PurchaseOrderItemsService {
  constructor(
    @InjectModel(Order.name) readonly POmodel: Model<OrderDocument>,
  ) {}

  async changeQty(id: string, quantity: number): Promise<any> {
    return this.POmodel.findOneAndUpdate(
      {
        'vendors.packages.items._id': new mongoose.Types.ObjectId(id),
      },
      {
        $set: {
          'vendors.packages.items.$.quantity': quantity,
        },
      },
    );
  }
  async changePrice(id: string, price: number): Promise<any> {
    return this.POmodel.findOneAndUpdate(
      {
        'vendors.packages.items._id': new mongoose.Types.ObjectId(id),
      },
      {
        $set: {
          'vendors.packages.items.$.price': price,
        },
      },
    );
  }

  async changeRejected(params: TChangeItems): Promise<any> {
    return this.POmodel.findOneAndUpdate(
      {
        'vendors.packages.items._id': new mongoose.Types.ObjectId(
          params.itemsId,
        ),
      },
      {
        $push: {
          'vendors.$[arrayVendor].packages.$[arrayPackage].items.$[arrayItem].status':
            {
              name: 'Rejected',
              timestamp: new Date(Date.now()),
            },
        },
      },
      {
        arrayFilters: [
          { 'arrayVendor.vendorId': params.vendorId },
          { 'arrayPackage._id': new mongoose.Types.ObjectId(params.packageId) },
          { 'arrayItem._id': new mongoose.Types.ObjectId(params.itemsId) },
        ],
      },
    );
  }

  async changeApprove(params: TChangeItems): Promise<any> {
    return this.POmodel.findOneAndUpdate(
      {
        'vendors.packages.items._id': new mongoose.Types.ObjectId(
          params.itemsId,
        ),
      },
      {
        $push: {
          'vendors.$[arrayVendor].packages.$[arrayPackage].items.$[arrayItem].status':
            {
              name: 'Approved',
              timestamp: new Date(Date.now()),
            },
        },
        $set: {
          'vendors.$[arrayVendor].packages.$[arrayPackage].items.$[arrayItem].sub_price':
            '$suggest_sub_price',
          'vendors.$[arrayVendor].packages.$[arrayPackage].items.$[arrayItem].quantity':
            '$suggest_quantity',
          'vendors.$[arrayVendor].packages.$[arrayPackage].items.$[arrayItem].updated':
            false,
        },
      },
      {
        arrayFilters: [
          { 'arrayVendor.vendorId': params.vendorId },
          { 'arrayPackage._id': new mongoose.Types.ObjectId(params.packageId) },
          { 'arrayItem._id': new mongoose.Types.ObjectId(params.itemsId) },
        ],
      },
    );
  }
}
