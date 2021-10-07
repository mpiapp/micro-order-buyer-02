import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatusDto } from '../dto/Status.dto';
import { PRIdDto } from '../dto/_IdPR.dto';
import { IUpdateStatusPurchaseRequest } from '../interfaces/services/UpdateStatusPurchaseRequest.interface';
import { PR, PRDocument } from '../schemas/purchase-request.schema';

@Injectable()
export class UpdateStatusService implements IUpdateStatusPurchaseRequest {
  constructor(@InjectModel(PR.name) private model: Model<PRDocument>) {}

  async addStatus(id: PRIdDto, param: StatusDto): Promise<any> {
    return this.model.findByIdAndUpdate(id, { $push: { Status: param } });
  }
}
