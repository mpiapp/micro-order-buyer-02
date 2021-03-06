import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICreatePurchaseRequest } from './../interfaces/services/CreatePurchaseRequest.intreface';
import { IDeletePurchaseRequest } from './../interfaces/services/isDeletePurchaseRequest.interface';
import { ISearchPurchaseRequest } from './../interfaces/services/SearchPurchaseRequest.interface';
import { IUpdatePurchaseRequest } from './../interfaces/services/UpdatePurchaseRequest.interface';
import {
  Order,
  OrderDocument,
} from './../../../../database/schema/orders.schema';
import { OrderUpdateDto } from './../../../../config/dto/order-update.dto';
import { ApprovalDto } from './../dto/Approval.dto';
import { TBasePaginate } from 'src/config/type/BasePaginate.type';
import { CreatePurchaseRequest } from '../interfaces/type/CreatePurchaseRequest.type';
import * as mongoose from 'mongoose';

@Injectable()
export class PurchaseRequestService
  implements
    ICreatePurchaseRequest,
    IDeletePurchaseRequest,
    IUpdatePurchaseRequest,
    ISearchPurchaseRequest
{
  constructor(
    @InjectModel(Order.name) private readonly model: Model<OrderDocument>,
  ) {}

  async createPurchaseRequest(params: CreatePurchaseRequest): Promise<Order> {
    return this.model.create(params);
  }

  async updatePurchaseRequest(params: OrderUpdateDto): Promise<Order> {
    const { id, ...update } = params;
    return this.model.findByIdAndUpdate(id, { $set: update }, { new: true });
  }

  async updateVendor(id: string, update: any): Promise<Order> {
    return this.model.findByIdAndUpdate(
      id,
      { $set: { vendors: update } },
      { new: true },
    );
  }

  async approvalPurchaseRequest(params: ApprovalDto): Promise<Order> {
    const { id, ...update } = params;
    return this.model.findByIdAndUpdate(
      id,
      { $set: { approval: update } },
      { new: true },
    );
  }

  async deletePurchaseRequest(id: string): Promise<Order> {
    return this.model.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }

  async searchPurchaseRequest(search: string): Promise<Order[]> {
    return this.model.find({ code: { $regex: search }, isDeleted: false });
  }

  async listPurchaseRequest(buyer: string): Promise<Order[]> {
    return this.model.aggregate([
      {
        $match: {
          'buyer._id': buyer,
          isDeleted: false,
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $addFields: {
          lastStatus: {
            $last: '$statuses.name',
          },
        },
      },
    ]);
  }

  async byIdPurchaseRequest(id: string): Promise<Order> {
    return this.model.findById(id);
  }

  async getOneAny(id: string): Promise<any> {
    return this.model.findById(id);
  }

  async getPaginate(params: TBasePaginate): Promise<any> {
    const { keyId, skip, limit } = params;
    return this.model.aggregate([
      {
        $match: {
          'buyer._id': keyId,
          isDeleted: false,
          'approval.name': { $exists: false },
        },
      },
      { $sort: { createdAt: -1 } },
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
      {
        $addFields: {
          lastStatus: {
            $last: '$statuses.name',
          },
        },
      },
    ]);
  }

  async getItems(id: string): Promise<any> {
    return this.model.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
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
            $mergeObjects: [
              {
                vendor: '$vendor',
              },
              '$packages',
            ],
          },
        },
      },
      {
        $unwind: '$items',
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                vendor: '$vendor',
              },
              '$items',
            ],
          },
        },
      },
    ]);
  }
}
