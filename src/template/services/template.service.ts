import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemPRDto } from './../../purchase-request/dto/Items.dto';
import { TemplateIdDto } from '../dto/IdTemplate.dto';
import { Template, TemplateDocument } from '../schemas/template.schema';
import { TemplateCreateDto } from '../dto/CreateTemplate.dto';

@Injectable()
export class TemplateService {
  constructor(
    @InjectModel(Template.name) private readonly model: Model<TemplateDocument>,
  ) {}

  async createTemplate(param: TemplateCreateDto): Promise<Template> {
    return this.model.create(param);
  }

  async deleteTemplate(id: TemplateIdDto): Promise<Template> {
    return this.model.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }

  async addItemTemplate(
    id: TemplateIdDto,
    product: ItemPRDto,
  ): Promise<Template> {
    return this.model.findByIdAndUpdate(
      id,
      { $push: { products: product } },
      { new: true },
    );
  }

  async removeItemTemplate(
    id: TemplateIdDto,
    product: ItemPRDto,
  ): Promise<any> {
    try {
      return await this.model.updateOne(
        { _id: id },
        { $pullAll: { product_id: product.productId } },
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateQtyItemTemplate(
    id: TemplateIdDto,
    product: ItemPRDto,
  ): Promise<any> {
    try {
      return await this.model.updateOne(
        { _id: id },
        { $inc: { 'items.$[elem].quantity': product.quantity } },
        { arrayFilters: [{ 'elem.product_id': product.productId }] },
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
