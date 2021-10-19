import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PO,
  PODocument,
} from './../../purchase-order/schemas/purchase-order.schema';

@Injectable()
export class PaginatePackageService {
  constructor(@InjectModel(PO.name) private model: Model<PODocument>) {}
}
