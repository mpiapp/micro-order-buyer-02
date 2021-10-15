import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemService } from './../../items/Item.service';
import { PO, PODocument } from '../schemas/purchase-order.schema';

@Injectable()
export class PurchaseOrderItemsService extends ItemService<PO> {
  constructor(@InjectModel(PO.name) readonly POmodel: Model<PODocument>) {
    super(POmodel);
  }
}
