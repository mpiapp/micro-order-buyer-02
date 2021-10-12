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
  // constructor(@InjectModel(PR.name) private model: Model<PRDocument>) {}

  // async addItemPurchaseRequest(id: PRIdDto, product: ItemPRDto): Promise<PR> {
  //   return this.model.findByIdAndUpdate(
  //     id,
  //     { $push: { products: product } },
  //     { new: true },
  //   );
  // }

  // async removeItemPurchaseRequest(id: PRIdDto, product: ItemPRDto): Promise<any> {
  //   try {
  //     return await this.model.updateOne(
  //       { _id: id },
  //       { $pullAll: { product_id: product.productId } },
  //     );
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // async updateQtyItemPurchaseRequest(
  //   id: PRIdDto,
  //   product: ItemPRDto,
  // ): Promise<any> {
  //   try {
  //     return await this.model.updateOne(
  //       { _id: id },
  //       { $inc: { 'items.$[elem].quantity': product.quantity } },
  //       { arrayFilters: [{ 'elem.product_id': product.productId }] },
  //     );
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}
