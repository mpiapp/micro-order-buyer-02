import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { IPackage } from './../../purchase-order/interfaces/type/IPOPackage.interface';
import { ItemTemplateDto } from 'src/template/dto/ItemTemplate.dto';
import { Order, OrderDocument } from './../../database/schema/orders.schema';

@Injectable()
export class PackageService {
  constructor(
    @InjectModel(Order.name) private readonly model: Model<OrderDocument>,
  ) {}

  async splitPackage(id: string, params: IPackage[]): Promise<any> {
    return this.model.updateOne(
      {
        $and: [
          {
            'vendors._id': new mongoose.Types.ObjectId(id),
          },
        ],
      },
      { $set: { 'vendors.$.packages': params } },
    );
  }

  async pushPackage(id: string, params: IPackage[]): Promise<any> {
    return this.model.updateOne(
      {
        $and: [
          {
            'vendors._id': new mongoose.Types.ObjectId(id),
          },
        ],
      },
      { $push: { 'vendors.$.packages': params } },
    );
  }

  async pullPackage(id: string, packageId: string): Promise<any> {
    return this.model.updateOne(
      {
        $and: [
          {
            'vendors._id': new mongoose.Types.ObjectId(id),
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

  async getPackageById(id: string): Promise<any> {
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
          'packages._id': '$_id',
        },
      },
      {
        $unwind: '$packages',
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                buyerId: '$buyerId',
                addressId: '$addressId',
                vendorId: '$vendorId',
                date: '$date',
              },
              '$packages',
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

  async getPackages(vendorId: string, status: string): Promise<any[]> {
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
        $match: {
          vendorId: vendorId,
        },
      },
      {
        $addFields: {
          'packages._id': '$_id',
        },
      },
      {
        $unwind: '$packages',
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                buyerId: '$buyerId',
                addressId: '$addressId',
                vendorId: '$vendorId',
                date: '$date',
              },
              '$packages',
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
          lastStatus: status,
        },
      },
    ]);
  }
}
