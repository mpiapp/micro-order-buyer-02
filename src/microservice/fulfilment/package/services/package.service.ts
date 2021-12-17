import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import {
  Order,
  OrderDocument,
} from './../../../../database/schema/orders.schema';
import { PackageStatusDto } from './../dto/PackageSattus.dto';
import { IPackage } from './../../../orders/purchase-order/interfaces/type/IPOPackage.interface';
import { ItemTemplateDto } from './../../../orders/template/dto/ItemTemplate.dto';

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

  async addStatusPackage(params: PackageStatusDto): Promise<any> {
    const { id, statuses, vendorId } = params;
    return this.model.findOneAndUpdate(
      {
        $and: [
          {
            'vendors.packages._id': new mongoose.Types.ObjectId(id),
          },
        ],
      },
      {
        $push: {
          'vendors.$[arrayVendor].packages.$[arrayPackage].statuses': statuses,
        },
      },
      {
        arrayFilters: [
          { 'arrayVendor.vendorId': vendorId },
          { 'arrayPackage._id': new mongoose.Types.ObjectId(id) },
        ],
      },
    );
  }

  async getPackageById(id: string): Promise<any> {
    return this.model.aggregate([
      {
        $match: {
          isDeleted: false,
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
                buyer: '$buyer',
                address: '$address',
                date: '$date',
                code_po: '$code_po',
                vendor_name: '$vendor_name',
              },
              '$vendors',
            ],
          },
        },
      },
      {
        $addFields: {
          paymentStatus: {
            $last: '$statuses.name',
          },
        },
      },
      {
        $match: {
          paymentStatus: { $not: { $eq: 'Waiting Down Payment' } },
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
                buyer: '$buyer',
                address: '$address',
                vendor: '$vendor',
                date: '$date',
                code_po: '$code_po',
                vendor_name: '$vendor_name',
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
          grand_total: {
            $sum: '$items.sub_total',
          },
          update: 'false',
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
        $match: {
          isDeleted: false,
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
                buyer: '$buyer',
                address: '$address',
                date: '$date',
                code_po: '$code_po',
                vendor_name: '$vendor_name',
              },
              '$vendors',
            ],
          },
        },
      },
      {
        $addFields: {
          paymentStatus: {
            $last: '$statuses.name',
          },
        },
      },
      {
        $match: {
          'vendor._id': vendorId,
          paymentStatus: { $not: { $eq: 'Waiting Down Payment' } },
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
                buyer: '$buyer',
                address: '$address',
                vendor: '$vendor',
                date: '$date',
                code_po: '$code_po',
                vendor_name: '$vendor_name',
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
          grand_total: {
            $sum: '$items.sub_total',
          },
          update: 'false',
        },
      },
    ]);
  }
}
