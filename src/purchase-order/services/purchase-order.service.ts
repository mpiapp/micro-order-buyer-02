import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './../../database/schema/orders.schema';
import { IDeletePurchaseOrder } from '../interfaces/services/DeletePurchaseOrder.interface';
import { TBasePaginate } from './../../config/type/BasePaginate.type';

@Injectable()
export class PurchaseOrderService implements IDeletePurchaseOrder {
  constructor(
    @InjectModel(Order.name) private readonly model: Model<OrderDocument>,
  ) {}

  async deletePurchaseOrder(id: string): Promise<Order> {
    return this.model.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }

  async searchPurchaseOrder(code: string): Promise<Order[]> {
    return this.model.find({
      code_pr: { $regex: code },
      isDeleted: false,
      'approval.name': { $exists: true },
    });
  }

  async listPurchaseOrder(id: string): Promise<Order[]> {
    return this.model.aggregate([
      {
        $match: {
          buyerId: id,
          isDeleted: false,
          'approval.name': { $exists: true },
        },
      },
      {
        $addFields: {
          'vendors._id': '$_id',
          lastStatus: {
            $last: '$statuses.name',
          },
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
                lastStatus: '$lastStatus',
              },
              '$vendors',
            ],
          },
        },
      },
      {
        $addFields: {
          'packages.lastStatus': { $last: '$packages.statuses.name' },
        },
      },
    ]);
  }

  async byIdPurchaseOrder(id: string): Promise<Order> {
    return this.model.findById(id);
  }

  async getPaginate(params: TBasePaginate): Promise<any> {
    const { keyId, skip, limit } = params;
    return this.model.aggregate([
      {
        $match: {
          buyerId: keyId,
          isDeleted: false,
          'approval.name': { $exists: true },
        },
      },
      {
        $addFields: {
          'vendors._id': '$_id',
          lastStatus: {
            $last: '$statuses.name',
          },
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
                lastStatus: '$lastStatus',
              },
              '$vendors',
            ],
          },
        },
      },
      {
        $addFields: {
          'packages.lastStatus': { $last: '$packages.statuses.name' },
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
