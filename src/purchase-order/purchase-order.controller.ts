import {
  Body,
  CacheInterceptor,
  Controller,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { IncomingMessage } from './../config/interfaces/Income.interface';
import { BaseResponse } from './../config/interfaces/response.base.interface';
import { POPaginateDto } from './dto/Paginate.dto';
import { IPurchaseOrdersResponse } from './interfaces/response/Many.interface';
import { IPurchaseOrderPaginateResponse } from './interfaces/response/Paginate.interface';
import { IPurchaseOrderResponse } from './interfaces/response/Single.interface';
import { PurchaseOrderService } from './services/purchase-order.service';

@ApiTags('Purchase Orders')
@Controller('purchase-order')
export class PurchaseOrderController {
  constructor(
    private readonly POMaster: PurchaseOrderService,
    private readonly Config: ConfigService,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @MessagePattern('purchase.order.get.all')
  async POList(
    @Body() message: IncomingMessage<string>,
  ): Promise<IPurchaseOrdersResponse> {
    try {
      const getAll = await this.POMaster.listPurchaseOrder(message.value);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>(
          'messageBase.PurchaseOrder.All.Success',
        ),
        data: getAll,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>(
          'messageBase.PurchaseOrder.All.Failed',
        ),
        data: null,
        errors: error,
      };
    }
  }

  @UseInterceptors(CacheInterceptor)
  @MessagePattern('purchase.order.get.by.id')
  async POById(
    @Body() message: IncomingMessage<string>,
  ): Promise<IPurchaseOrderResponse> {
    try {
      const getOne = await this.POMaster.byIdPurchaseOrder(message.value);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>(
          'messageBase.PurchaseOrder.One.Success',
        ),
        data: getOne,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>(
          'messageBase.PurchaseOrder.One.Failed',
        ),
        data: null,
        errors: error,
      };
    }
  }

  @UseInterceptors(CacheInterceptor)
  @MessagePattern('purchase.order.search')
  async POSearch(
    @Body() message: IncomingMessage<string>,
  ): Promise<IPurchaseOrdersResponse> {
    try {
      const getAll = await this.POMaster.searchPurchaseOrder(message.value);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>(
          'messageBase.PurchaseOrder.All.Success',
        ),
        data: getAll,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>(
          'messageBase.PurchaseOrder.All.Failed',
        ),
        data: null,
        errors: error,
      };
    }
  }

  @MessagePattern('purchase.order.paginate')
  async getPurchaseOrderPaginate(
    @Body() message: IncomingMessage<POPaginateDto>,
  ): Promise<IPurchaseOrderPaginateResponse> {
    const { skip, limit } = message.value;
    const getData = await this.POMaster.getPaginate({
      ...message.value,
      skip: Number(skip),
      limit: Number(limit),
    });
    if (!getData) {
      return {
        count: 0,
        page: Number(skip),
        limit: Number(limit),
        data: null,
      };
    }
    const { data, metadata } = getData[0];
    return {
      count: metadata[0] ? metadata[0].total : 0,
      page: Number(skip),
      limit: Number(limit),
      data: data,
    };
  }

  @MessagePattern('purchase.order.delete')
  async PODelete(
    @Body() message: IncomingMessage<string>,
  ): Promise<BaseResponse> {
    try {
      await this.POMaster.deletePurchaseOrder(message.value);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>(
          'messageBase.PurchaseOrder.delete.Success',
        ),
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>(
          'messageBase.PurchaseOrder.delete.Failed',
        ),
        errors: error,
      };
    }
  }
}
