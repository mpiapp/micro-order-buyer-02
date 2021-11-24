import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderCreateDto } from './../../config/dto/order-create.dto';
import { ICreatePurchaseRequest } from '../interfaces/services/CreatePurchaseRequest.intreface';
import { IDeletePurchaseRequest } from '../interfaces/services/isDeletePurchaseRequest.interface';
import { ISearchPurchaseRequest } from '../interfaces/services/SearchPurchaseRequest.interface';
import { IUpdatePurchaseRequest } from '../interfaces/services/UpdatePurchaseRequest.interface';
import { Order, OrderDocument } from './../../database/schema/orders.schema';
import { OrderUpdateDto } from './../../config/dto/order-update.dto';

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

  async createPurchaseRequest(params: OrderCreateDto): Promise<Order> {
    return this.model.create(params);
  }

  async updatePurchaseRequest(params: OrderUpdateDto): Promise<Order> {
    const { id, ...update } = params;
    return this.model.findByIdAndUpdate(id, { $set: update }, { new: true });
  }

  async deletePurchaseRequest(id: string): Promise<Order> {
    return this.model.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }

  async searchPurchaseRequest(search: string): Promise<Order[]> {
    return this.model.find({ code: { $regex: search } });
  }

  async listPurchaseRequest(buyer: string): Promise<Order[]> {
    return this.model.find({ buyerId: buyer });
  }

  async byIdPurchaseRequest(id: string): Promise<Order> {
    return this.model.findById(id);
  }
}
