import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Template,
  TemplateDocument,
} from './../../../../database/schema/template.schema';
import { TemplateCreateDto } from './../dto/CreateTemplate.dto';
import { ICreateTemplate } from './../interfaces/services/CreateTemplate.interface';
import { IDeleteTemplate } from './../interfaces/services/DeleteTemplate.interface';
import moment = require('moment');
import { TemplateUpdateDto } from '../dto/UpdateTemplate.dto';
import { TBasePaginate } from './../../../../config/type/BasePaginate.type';
import * as mongoose from 'mongoose';

@Injectable()
export class TemplateService implements ICreateTemplate, IDeleteTemplate {
  constructor(
    @InjectModel(Template.name) private readonly model: Model<TemplateDocument>,
  ) {}

  async createTemplate(param: TemplateCreateDto): Promise<Template> {
    return this.model.create(param);
  }

  async updateTemplate(params: TemplateUpdateDto): Promise<Template> {
    const { id, ...update } = params;
    return this.model.findByIdAndUpdate(id, { $set: update }, { new: true });
  }

  async deleteTemplate(id: string): Promise<Template> {
    return this.model.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }

  async listTemplate(idBuyer: string): Promise<Template[]> {
    return this.model
      .find({ buyerId: idBuyer, isDeleted: false })
      .sort({ createdAt: -1 });
  }

  async getByIdTemplate(id: string): Promise<Template> {
    return this.model.findById(id);
  }

  async searchTemplate(search: string): Promise<Template[]> {
    return this.model
      .find({
        name: { $regex: search },
        createdAt: {
          $gte: moment(new Date(search)).startOf('day').toDate(),
          $lte: moment(new Date(search)).endOf('day').toDate(),
        },
      })
      .sort({ createdAt: -1 });
  }

  async getPaginate(params: TBasePaginate): Promise<any> {
    const { keyId, skip, limit } = params;
    return this.model.aggregate([
      {
        $match: {
          buyerId: keyId,
          isDeleted: false,
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          metadata: [
            {
              $count: 'total',
            },
          ],
          data: [
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
          ],
        },
      },
      {
        $addFields: {
          lastStatus: {
            $last: '$statuses.name',
          },
        },
      },
    ]);
  }

  async getItems(id: string): Promise<any> {
    return this.model.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $unwind: '$vendors',
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$vendors'],
          },
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
                vendor: '$vendor',
              },
              '$packages',
            ],
          },
        },
      },
      {
        $unwind: '$items',
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                vendor: '$vendor',
              },
              '$items',
            ],
          },
        },
      },
    ]);
  }
}
