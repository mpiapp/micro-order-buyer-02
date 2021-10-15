import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemService } from './../../items/Item.service';
import { PR, PRDocument } from '../schemas/purchase-request.schema';

@Injectable()
export class UpdateItemsService extends ItemService<PR> {
  constructor(@InjectModel(PR.name) readonly PRmodel: Model<PRDocument>) {
    super(PRmodel);
  }
}
