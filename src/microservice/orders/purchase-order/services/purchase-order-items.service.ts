import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Order,
  OrderDocument,
} from './../../../../database/schema/orders.schema';
import * as mongoose from 'mongoose';
import { TChangeItems } from './../interfaces/type/TChangeItems.type';
import { ItemChangeRejectDto } from '../dto/ItemChangeReject.dto';

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

  async getItems(id: string): Promise<any> {
    return this.POmodel.aggregate([
      {
        $unwind: '$vendors',
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$vendors'],
          },
        },
      },
      {
        $unwind: '$packages',
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$packages'],
          },
        },
      },
      {
        $unwind: '$items',
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$items'],
          },
        },
      },
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
    ]);
  }

  async changeRejected(
    params: TChangeItems,
    items: ItemChangeRejectDto,
  ): Promise<any> {
    return this.POmodel.findOneAndUpdate(
      {
        'vendors.packages.items._id': new mongoose.Types.ObjectId(
          params.itemsId,
        ),
      },
      {
        $push: {
          'vendors.$[arrayVendor].packages.$[arrayPackage].items.$[arrayItem].statuses':
            {
              name: 'Rejected',
              timestamp: new Date(Date.now()),
            },
        },
        $set: {
          'vendors.$[arrayVendor].packages.$[arrayPackage].items.$[arrayItem].sub_total':
            items.sub_total_original,
          'vendors.$[arrayVendor].packages.$[arrayPackage].items.$[arrayItem].quantity':
            items.quantity_original,
          'vendors.$[arrayVendor].packages.$[arrayPackage].items.$[arrayItem].retail_price':
            items.retail_price_original,
        },
      },
      {
        arrayFilters: [
          { 'arrayVendor.vendor._id': params.vendorId },
          { 'arrayPackage._id': new mongoose.Types.ObjectId(params.packageId) },
          { 'arrayItem._id': new mongoose.Types.ObjectId(params.itemsId) },
        ],
        returnNewDocument: true,
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
          'vendors.$[arrayVendor].packages.$[arrayPackage].items.$[arrayItem].statuses':
            {
              name: 'Approved',
              timestamp: new Date(Date.now()),
            },
        },
      },
      {
        arrayFilters: [
          { 'arrayVendor.vendor._id': params.vendorId },
          { 'arrayPackage._id': new mongoose.Types.ObjectId(params.packageId) },
          { 'arrayItem._id': new mongoose.Types.ObjectId(params.itemsId) },
        ],
      },
    );
  }
}
