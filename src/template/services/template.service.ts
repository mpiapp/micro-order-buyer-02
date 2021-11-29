import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template, TemplateDocument } from '../schemas/template.schema';
import { TemplateCreateDto } from '../dto/CreateTemplate.dto';
import { ICreateTemplate } from '../interfaces/services/CreateTemplate.interface';
import { IDeleteTemplate } from '../interfaces/services/DeleteTemplate.interface';
import moment = require('moment');
import { TemplateUpdateDto } from '../dto/UpdateTemplate.dto';
import { TBasePaginate } from './../../config/type/BasePaginate.type';

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
    return this.model.find({ buyerId: idBuyer, isDeleted: false });
  }

  async getByIdTemplate(id: string): Promise<Template> {
    return this.model.findById(id);
  }

  async searchTemplate(search: string): Promise<Template[]> {
    return this.model.find({
      name: { $regex: search },
      createdAt: {
        $gte: moment(new Date(search)).startOf('day').toDate(),
        $lte: moment(new Date(search)).endOf('day').toDate(),
      },
    });
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
}
