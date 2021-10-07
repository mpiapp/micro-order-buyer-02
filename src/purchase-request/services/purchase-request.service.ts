import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BuyerDto } from '../dto/Buyer.dto';
import { CodePRDto } from '../dto/CodePR.dto';
import { PRCreateDto } from '../dto/CreatePR.dto';
import { PRUpdateDto } from '../dto/UpdatePR.dto';
import { PRIdDto } from '../dto/_IdPR.dto';
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

  async createPurchaseRequest(param: PRCreateDto): Promise<PR> {
    return this.model.create(param);
  }

  async updatePurchaseRequest(id: PRIdDto, param: PRUpdateDto) {
    return this.model.findByIdAndUpdate(id, { $set: param }, { new: true });
  }

  async deletePurchaseRequest(id: PRIdDto): Promise<PR> {
    return this.model.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }

  async searchPurchaseRequest(search: CodePRDto): Promise<PR[]> {
    return this.model.find({ $text: { $search: search.code } });
  }
  async listPurchaseRequest(id: BuyerDto): Promise<PR[]> {
    return this.model.find({ buyerId: { $regex: id.buyerId } });
  }
  async byIdPurchaseRequest(id: PRIdDto): Promise<PR> {
    return this.model.findById(id);
  }
}
