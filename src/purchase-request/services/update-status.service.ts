import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatusDto } from '../dto/Status.dto';
import { IUpdateStatusPurchaseRequest } from '../interfaces/services/UpdateStatusPurchaseRequest.interface';
import { Order, OrderDocument } from './../../database/schema/orders.schema';

@Injectable()
export class UpdateStatusService implements IUpdateStatusPurchaseRequest {
  constructor(@InjectModel(Order.name) private model: Model<OrderDocument>) {}

  async addStatus(param: StatusDto): Promise<any> {
    const { id, ...update } = param;
    return this.model.findByIdAndUpdate(id, { $push: { Status: update } });
  }
}
