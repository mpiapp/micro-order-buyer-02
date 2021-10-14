import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemService } from './../../items/Item.service';
import { Template, TemplateDocument } from '../schemas/template.schema';

@Injectable()
export class TemplateItemsService extends ItemService<Template> {
  constructor(
    @InjectModel(Template.name) readonly TemplateModel: Model<TemplateDocument>,
  ) {
    super(TemplateModel);
  }
}
