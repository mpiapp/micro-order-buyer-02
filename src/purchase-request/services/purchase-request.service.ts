import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PurchaseRequestCreateDto } from '../dto/CreatePurchaseRequest.dto';
import { PurchaseRequestIdDto } from '../dto/IdPurchaseRequest.dto';
import { ICreatePurchaseRequest } from '../interfaces/services/CreatePurchaseRequest.intreface';
import { IDeletePurchaseRequest } from '../interfaces/services/isDeletePurchaseRequest.interface';
import { PR, PRDocument } from '../schemas/purchase-request.schema';

@Injectable()
export class PurchaseRequestService
  implements ICreatePurchaseRequest, IDeletePurchaseRequest
{
  constructor(@InjectModel(PR.name) private model: Model<PRDocument>) {}

  async createPurchaseRequest(param: PurchaseRequestCreateDto): Promise<PR> {
    return this.model.create(param);
  }

  async deletePurchaseRequest(id: PurchaseRequestIdDto): Promise<PR> {
    return this.model.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }
}
