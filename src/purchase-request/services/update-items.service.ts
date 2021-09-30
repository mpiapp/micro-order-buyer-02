import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PurchaseRequestIdDto } from '../dto/IdPurchaseRequest.dto';
import { Product } from '../dto/Product.dto';
import { IUpdateItemPurchaseRequest } from '../interfaces/services/UpdateProductPurchaseRequest.interface';
import { PR, PRDocument } from '../schemas/purchase-request.schema';

@Injectable()
export class UpdateItemsService implements IUpdateItemPurchaseRequest {
  constructor(@InjectModel(PR.name) private model: Model<PRDocument>) {}

  async addItemPurchaseRequest(
    id: PurchaseRequestIdDto,
    product: Product,
  ): Promise<PR> {
    return this.model.findByIdAndUpdate(
      id,
      { $push: { products: product } },
      { new: true },
    );
  }

  async removeItemPurchaseRequest(
    id: PurchaseRequestIdDto,
    product: Product,
  ): Promise<any> {
    try {
      return await this.model.updateOne(
        { _id: id },
        { $pullAll: { product_id: product.product_id } },
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateQtyItemPurchaseRequest(
    id: PurchaseRequestIdDto,
    product: Product,
  ): Promise<any> {
    try {
      return await this.model.updateOne(
        { _id: id },
        { $inc: { 'products.$[elem].quantity': product.quantity } },
        { arrayFilters: [{ 'elem.product_id': product.product_id }] },
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
