import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { StatusDto } from '../dto/Status.dto';
import { IUpdateStatusPurchaseRequest } from './../interfaces/services/UpdateStatusPurchaseRequest.interface';
import {
  Order,
  OrderDocument,
} from './../../../../database/schema/orders.schema';

@Injectable()
export class UpdateStatusService implements IUpdateStatusPurchaseRequest {
  constructor(@InjectModel(Order.name) private model: Model<OrderDocument>) {}

  async addStatus(params: StatusDto): Promise<any> {
    const { id, ...update } = params;
    return this.model.findOneAndUpdate(
      {
        $and: [
          {
            'vendors._id': new mongoose.Types.ObjectId(id),
          },
        ],
      },
      {
        $push: {
          'vendors.$[arrayVendor].statuses': update,
        },
      },
      {
        arrayFilters: [
          { 'arrayVendor.vendors._id': new mongoose.Types.ObjectId(id) },
        ],
      },
    );
  }
}
