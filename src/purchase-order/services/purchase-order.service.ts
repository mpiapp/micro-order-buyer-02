import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PO, PODocument } from '../schemas/purchase-order.schema';
import { IPurchaseOrder } from '../interfaces/type/IPOcreate.interface';
import { ICreatePurchaseOrder } from '../interfaces/services/CreatePurchaseOrder.interface';
import { IDeletePurchaseOrder } from '../interfaces/services/DeletePurchaseOrder.interface';

@Injectable()
export class PurchaseOrderService
  implements ICreatePurchaseOrder, IDeletePurchaseOrder
{
  constructor(
    @InjectModel(PO.name) private readonly model: Model<PODocument>,
  ) {}

  async createPurchaseOrder(params: IPurchaseOrder): Promise<PO> {
    return this.model.create(params);
  }

  async deletePurchaseOrder(id: string): Promise<PO> {
    return this.model.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }

  async searchPurchaseOrder(code: string): Promise<PO[]> {
    return this.model.find({ code: { $regex: code } });
  }

  async listPurchaseOrder(id: string): Promise<PO[]> {
    return this.model.find({ buyerId: id });
  }

  async byIdPurchaseOrder(id: string): Promise<PO> {
    return this.model.findById(id);
  }
}
