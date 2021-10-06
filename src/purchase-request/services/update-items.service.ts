import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemDto } from '../dto/Items.dto';
import { PRIdDto } from '../dto/_IdPR.dto';
import { IUpdateItemPurchaseRequest } from '../interfaces/services/UpdateProductProcessRequest.interface';
import { PR, PRDocument } from '../schemas/purchase-request.schema';

@Injectable()
export class UpdateItemsService implements IUpdateItemPurchaseRequest {
  constructor(@InjectModel(PR.name) private model: Model<PRDocument>) {}

  async addItemPurchaseRequest(id: PRIdDto, product: ItemDto): Promise<PR> {
    return this.model.findByIdAndUpdate(
      id,
      { $push: { products: product } },
      { new: true },
    );
  }

  async removeItemPurchaseRequest(id: PRIdDto, product: ItemDto): Promise<any> {
    try {
      return await this.model.updateOne(
        { _id: id },
        { $pullAll: { product_id: product.productId } },
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateQtyItemPurchaseRequest(
    id: PRIdDto,
    product: ItemDto,
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
