import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { TStatusDefault } from '../interfaces/type/StatusDefault.type';
import { Order, OrderDocument } from './../../../database/schema/orders.schema';
import { TStatusPackageLevel } from './../interfaces/type/StatusPackageLevel.type';
import { TStatusItemLevel } from './../interfaces/type/StatusItemLevel.type';
import { TStatusVendorLevel } from './../interfaces/type/StatusVendorLevel.type';

@Injectable()
export class OrdersStatusService {
  constructor(@InjectModel(Order.name) private model: Model<OrderDocument>) {}

  async pushStatusOrder(params: TStatusDefault): Promise<Order> {
    const { id, status } = params;
    return this.model.findByIdAndUpdate(id, { $push: { statuses: status } });
  }

  async pushStatusVendor(params: TStatusVendorLevel): Promise<Order> {
    const { vendorId, status } = params;
    return this.model.findOneAndUpdate(
      {
        $and: [
          {
            'vendors.vendor._id': new mongoose.Types.ObjectId(vendorId),
          },
        ],
      },
      {
        $push: {
          'vendors.$[arrayVendor].statuses': status,
        },
      },
      {
        arrayFilters: [
          { 'arrayVendor.vendor._id': new mongoose.Types.ObjectId(vendorId) },
        ],
      },
    );
  }

  async pushStatusPackage(params: TStatusPackageLevel): Promise<any> {
    const { packageId, status, vendorId } = params;
    return this.model.findOneAndUpdate(
      {
        $and: [
          {
            'vendors.packages._id': new mongoose.Types.ObjectId(packageId),
          },
        ],
      },
      {
        $push: {
          'vendors.$[arrayVendor].packages.$[arrayPackage].statuses': status,
        },
      },
      {
        arrayFilters: [
          { 'arrayVendor.vendor._id': new mongoose.Types.ObjectId(vendorId) },
          { 'arrayPackage._id': new mongoose.Types.ObjectId(packageId) },
        ],
      },
    );
  }

  async pushStatusItem(params: TStatusItemLevel): Promise<Order> {
    const { packageId, status, vendorId, itemsId } = params;
    return this.model.findOneAndUpdate(
      {
        'vendors.packages.items._id': new mongoose.Types.ObjectId(itemsId),
      },
      {
        $push: {
          'vendors.$[arrayVendor].packages.$[arrayPackage].items.$[arrayItem].status':
            status,
        },
      },
      {
        arrayFilters: [
          { 'arrayVendor.vendor._id': new mongoose.Types.ObjectId(vendorId) },
          { 'arrayPackage._id': new mongoose.Types.ObjectId(packageId) },
          { 'arrayItem._id': new mongoose.Types.ObjectId(itemsId) },
        ],
      },
    );
  }
}
