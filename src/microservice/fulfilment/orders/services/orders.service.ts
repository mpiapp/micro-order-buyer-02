import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import {
  Order,
  OrderDocument,
} from './../../../../database/schema/orders.schema';
import { IOrderService } from './../interfaces/services/orders.service.interface';

@Injectable()
export class OrdersService implements IOrderService {
  constructor(
    @InjectModel(Order.name) private readonly model: Model<OrderDocument>,
  ) {}

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
          grand_total: {
            $sum: '$packages.total',
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

  async getOrders(vendorId: string): Promise<any[]> {
    return this.model.aggregate([
      {
        $match: {
          isDeleted: false,
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
                vendor_name: '$vendor_name',
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
          'packages.lastStatus': { $last: '$packages.statuses.name' },
          grand_total: {
            $sum: '$packages.total',
          },
        },
      },
      {
        $match: {
          vendorId: vendorId,
          lastStatus: 'Waiting Down Payment',
        },
      },
    ]);
  }
}
