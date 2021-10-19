import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PO,
  PODocument,
} from './../../purchase-order/schemas/purchase-order.schema';
import * as mongoose from 'mongoose';
import { IPackage } from './../../purchase-order/interfaces/type/IPOPackage.interface';
import { ItemTemplateDto } from 'src/template/dto/ItemTemplate.dto';

@Injectable()
export class PackageService {
  constructor(
    @InjectModel(PO.name) private readonly model: Model<PODocument>,
  ) {}

  async splitPackage(
    id: string,
    vendorId: string,
    params: IPackage[],
  ): Promise<any> {
    return this.model.updateOne(
      {
        $and: [
          {
            _id: new mongoose.Types.ObjectId(id),
            'vendors.vendorId': new mongoose.Types.ObjectId(vendorId),
          },
        ],
      },
      { $set: { 'vendors.$.packages': params } },
    );
  }

  async pushPackage(
    id: string,
    vendorId: string,
    params: IPackage[],
  ): Promise<any> {
    return this.model.updateOne(
      {
        $and: [
          {
            _id: new mongoose.Types.ObjectId(id),
            'vendors.vendorId': new mongoose.Types.ObjectId(vendorId),
          },
        ],
      },
      { $push: { 'vendors.$.packages': params } },
    );
  }

  async pullPackage(
    id: string,
    vendorId: string,
    packageId: string,
  ): Promise<any> {
    return this.model.updateOne(
      {
        $and: [
          {
            _id: new mongoose.Types.ObjectId(id),
            'vendors.vendorId': new mongoose.Types.ObjectId(vendorId),
          },
        ],
      },
      { $pull: { 'vendors.$.packages.$._id': packageId } },
      { safe: true },
    );
  }

  async pushItemPackage(id: string, params: ItemTemplateDto[]): Promise<any> {
    return this.model.updateOne(
      {
        $and: [
          {
            'vendors.packages._id': new mongoose.Types.ObjectId(id),
          },
        ],
      },
      { $push: { 'vendors.$.packages.$.items': params } },
    );
  }

  async pullItemPackage(id: string, productId: string): Promise<any> {
    return this.model.updateOne(
      {
        $and: [
          {
            'vendors.packages._id': new mongoose.Types.ObjectId(id),
          },
        ],
      },
      { $pull: { 'vendors.$.packages.$.items.productId': productId } },
    );
  }

  async getOrderById(id: string): Promise<any> {
    return this.model.aggregate([
      {
        $addFields: {
          'vendors._id': '$_id',
        },
      },
      {
        $unwind: '$vendors',
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                buyerId: '$buyerId',
                addressId: '$addressId',
                date: '$date',
              },
              '$vendors',
            ],
          },
        },
      },
      {
        $addFields: {
          lastStatus: {
            $last: '$statuses.name',
          },
        },
      },
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
    ]);
  }

  async getOrder(vendorId: string, status: string): Promise<any[]> {
    return this.model.aggregate([
      {
        $addFields: {
          'vendors._id': '$_id',
        },
      },
      {
        $unwind: '$vendors',
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                buyerId: '$buyerId',
                addressId: '$addressId',
                date: '$date',
              },
              '$vendors',
            ],
          },
        },
      },
      {
        $addFields: {
          lastStatus: {
            $last: '$statuses.name',
          },
        },
      },
      {
        $match: {
          vendorId: vendorId,
          lastStatus: status,
        },
      },
    ]);
  }
}
