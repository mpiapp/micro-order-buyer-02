import {
  Body,
  CacheInterceptor,
  Controller,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { IncomingMessage } from 'src/config/interfaces/Income.interface';
import { BaseResponse } from './../config/interfaces/response.base.interface';
import { Helper } from './../utils/helper.utils';
import { PRCreateDto } from './dto/CreatePR.dto';
import { ItemPRDto } from './dto/Items.dto';
import { StatusDto } from './dto/Status.dto';
import { PRUpdateDto } from './dto/UpdatePR.dto';
import { IPurchaseRequestsResponse } from './interfaces/response/Many.interface';
import { IPurchaseRequestResponse } from './interfaces/response/Single.interface';
import { PR } from './schemas/purchase-request.schema';
import { GenerateService } from './services/generate.service';
import { PurchaseRequestService } from './services/purchase-request.service';
import { UpdateItemsService } from './services/update-items.service';
import { UpdateStatusService } from './services/update-status.service';

@ApiTags('Purchase Request')
@Controller('PurchaseRequest')
export class PurchaseRequestController {
  constructor(
    private readonly PRMaster: PurchaseRequestService,
    private readonly Generate: GenerateService,
    private readonly Items: UpdateItemsService,
    private readonly Status: UpdateStatusService,
    private readonly HelperService: Helper,
    private readonly Config: ConfigService,
  ) {}

  private async reCalculate(_id: string) {
    const getPRbyId = await this.PRMaster.byIdPurchaseRequest(_id);
    return this.PRMaster.updatePurchaseRequest({
      id: _id,
      total: this.HelperService.SUM(getPRbyId),
    });
  }

  @MessagePattern('purchase.request.save')
  async PRCreate(
    @Body() message: IncomingMessage<PRCreateDto>,
  ): Promise<BaseResponse> {
    try {
      const { value } = message;
      const generateCodePR = await this.Generate.generateCode({
        code: value.code,
      });
      value.code = generateCodePR.code;
      this.HelperService.sumValidate(value);
      this.PRMaster.createPurchaseRequest(value);
      return {
        status: HttpStatus.CREATED,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.save.Success',
        ),
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.save.Failed',
        ),
        errors: error,
      };
    }
  }

  @MessagePattern('purchase.request.update')
  async PRUpdate(
    @Body() message: IncomingMessage<PRUpdateDto>,
  ): Promise<IPurchaseRequestResponse> {
    try {
      const { value } = message;
      this.HelperService.sumValidate(value);
      const update = await this.PRMaster.updatePurchaseRequest(value);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.update.Success',
        ),
        data: update,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.update.Failed',
        ),
        data: null,
        errors: error,
      };
    }
  }

  @MessagePattern('purchase.request.delete')
  async PRDelete(
    @Body() message: IncomingMessage<string>,
  ): Promise<BaseResponse> {
    try {
      await this.PRMaster.deletePurchaseRequest(message.value);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.delete.Success',
        ),
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.delete.Failed',
        ),
        errors: error,
      };
    }
  }

  @MessagePattern('purchase.request.add.item')
  async PRaddItem(
    @Query('id') id: string,
    @Body() product: ItemPRDto,
  ): Promise<PR> {
    const addQty = await this.Items.addItem(
      {
        $and: [
          {
            _id: new mongoose.Types.ObjectId(id),
            'items.productId': product.productId,
          },
        ],
      },
      { $inc: { 'items.$.quantity': product.quantity } },
    );

    if (!addQty.matchedCount) {
      await this.Items.addItem(
        { _id: new mongoose.Types.ObjectId(id) },
        { $push: { items: product } },
      );
      return this.reCalculate(id);
    }

    return this.reCalculate(id);
  }

  @MessagePattern('purchase.request.update.item')
  async PRUpdateItem(
    @Query('id') id: string,
    @Body() product: ItemPRDto,
  ): Promise<PR> {
    await this.Items.addItem(
      {
        $and: [
          {
            _id: new mongoose.Types.ObjectId(id),
            'items.productId': product.productId,
          },
        ],
      },
      { $inc: { 'items.$.quantity': product.quantity } },
    );
    return this.reCalculate(id);
  }

  @MessagePattern('purchase.request.remove.item')
  async PRRemoveItem(
    @Query('id') id: string,
    @Body() product: ItemPRDto,
  ): Promise<PR> {
    await this.Items.removeItem(
      { _id: new mongoose.Types.ObjectId(id) },
      { $pull: { items: { productId: product.productId } } },
    );
    return this.reCalculate(id);
  }

  @UseInterceptors(CacheInterceptor)
  @MessagePattern('purchase.request.get.all')
  async PRList(
    @Body() message: IncomingMessage<string>,
  ): Promise<IPurchaseRequestsResponse> {
    try {
      const getAll = await this.PRMaster.listPurchaseRequest(message.value);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.All.Success',
        ),
        data: getAll,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.All.Failed',
        ),
        data: null,
        errors: error,
      };
    }
  }

  @UseInterceptors(CacheInterceptor)
  @MessagePattern('purchase.request.get.by.id')
  async PRById(
    @Body() message: IncomingMessage<string>,
  ): Promise<IPurchaseRequestResponse> {
    try {
      const getOne = await this.PRMaster.byIdPurchaseRequest(message.value);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.One.Success',
        ),
        data: getOne,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.One.Failed',
        ),
        data: null,
        errors: error,
      };
    }
  }

  @UseInterceptors(CacheInterceptor)
  @MessagePattern('purchase.request.search')
  async PRSearch(
    @Body() message: IncomingMessage<string>,
  ): Promise<IPurchaseRequestsResponse> {
    try {
      const getAll = await this.PRMaster.searchPurchaseRequest(message.value);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.Search.Success',
        ),
        data: getAll,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.Search.Failed',
        ),
        data: null,
        errors: error,
      };
    }
  }

  @UseInterceptors(CacheInterceptor)
  @MessagePattern('purchase.request.add.status')
  async PRaddStatus(@Body() message: IncomingMessage<StatusDto>): Promise<PR> {
    return this.Status.addStatus(message.value);
  }
}
