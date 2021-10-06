import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PRCreateDto } from '../dto/CreatePR.dto';
import { PRIdDto } from '../dto/_IdPR.dto';
import { ICreatePurchaseRequest } from '../interfaces/services/CreateProcessRequest.intreface';
import { IDeletePurchaseRequest } from '../interfaces/services/isDeleteProcessRequest.interface';
import { PR, PRDocument } from '../schemas/purchase-request.schema';

@Injectable()
export class PurchaseRequestService
  implements ICreatePurchaseRequest, IDeletePurchaseRequest
{
  constructor(
    @InjectModel(PR.name) private readonly model: Model<PRDocument>,
  ) {}

  async createPurchaseRequest(param: PRCreateDto): Promise<PR> {
    param.code = `${param.code}-${Math.random().toString(36).substr(2, 9)}`;
    return this.model.create(param);
  }

  async deletePurchaseRequest(id: PRIdDto): Promise<PR> {
    return this.model.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }
}
