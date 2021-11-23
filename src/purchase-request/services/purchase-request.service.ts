import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PRCreateDto } from '../dto/CreatePR.dto';
import { PRUpdateDto } from '../dto/UpdatePR.dto';
import { ICreatePurchaseRequest } from '../interfaces/services/CreatePurchaseRequest.intreface';
import { IDeletePurchaseRequest } from '../interfaces/services/isDeletePurchaseRequest.interface';
import { ISearchPurchaseRequest } from '../interfaces/services/SearchPurchaseRequest.interface';
import { IUpdatePurchaseRequest } from '../interfaces/services/UpdatePurchaseRequest.interface';
import { PR, PRDocument } from '../schemas/purchase-request.schema';

@Injectable()
export class PurchaseRequestService
  implements
    ICreatePurchaseRequest,
    IDeletePurchaseRequest,
    IUpdatePurchaseRequest,
    ISearchPurchaseRequest
{
  constructor(
    @InjectModel(PR.name) private readonly model: Model<PRDocument>,
  ) {}

  async createPurchaseRequest(params: PRCreateDto): Promise<PR> {
    return this.model.create(params);
  }

  async updatePurchaseRequest(params: PRUpdateDto): Promise<PR> {
    const { id } = params;
    delete params['id'];
    return this.model.findByIdAndUpdate(id, { $set: params }, { new: true });
  }

  async deletePurchaseRequest(id: string): Promise<PR> {
    return this.model.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }

  async searchPurchaseRequest(search: string): Promise<PR[]> {
    return this.model.find({ code: { $regex: search } });
  }

  async listPurchaseRequest(buyer: string): Promise<PR[]> {
    return this.model.find({ buyerId: buyer });
  }

  async byIdPurchaseRequest(id: string): Promise<PR> {
    return this.model.findById(id);
  }
}
