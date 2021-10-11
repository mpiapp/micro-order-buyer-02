import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createPODto } from '../dto/CreatePO.dto';
import { PO, PODocument } from '../schemas/purchase-order.schema';

@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectModel(PO.name) private readonly model: Model<PODocument>,
  ) {}

  async createPurchaseOrder(param: createPODto): Promise<PO> {
    return this.model.create(param);
  }
}
