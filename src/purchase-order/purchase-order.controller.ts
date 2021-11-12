import {
  Body,
  CacheInterceptor,
  Controller,
  HttpStatus,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/config/interfaces/response.base.interface';
import { POPaginateDto } from './dto/Paginate.dto';
import { POCreateDto } from './dto/POCreate.dto';
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
  @MessagePattern('Purchase-Order-List-Data')
  async POList(
    @Query('buyerId') buyerId: string,
  ): Promise<IPurchaseOrdersResponse> {
    try {
      const getAll = await this.POMaster.listPurchaseOrder(buyerId);
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
  @MessagePattern('Purchase-Order-Get-Data-By-Id')
  async POById(@Query('id') id: string): Promise<IPurchaseOrderResponse> {
    try {
      const getOne = await this.POMaster.byIdPurchaseOrder(id);
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
  @MessagePattern('Purchase-Order-Search-Data')
  async POSearch(
    @Query('search') search: string,
  ): Promise<IPurchaseOrdersResponse> {
    try {
      const getAll = await this.POMaster.searchPurchaseOrder(search);
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

  @MessagePattern('Purchase-Order-Paginate')
  async getPurchaseOrderPaginate(
    @Query() params: POPaginateDto,
  ): Promise<IPurchaseOrderPaginateResponse> {
    const { skip, limit } = params;
    const getData = await this.POMaster.getPaginate(params);
    if (!getData) {
      return {
        count: 0,
        page: skip,
        limit: limit,
        data: null,
      };
    }
    const { data, metadata } = getData[0];
    return {
      count: metadata[0] ? metadata[0].total : 0,
      page: skip,
      limit: limit,
      data: data,
    };
  }

  @MessagePattern('Purchase-Order-Save')
  async POCreate(@Body() params: POCreateDto): Promise<BaseResponse> {
    try {
      await this.POMaster.createPurchaseOrder(params);
      return {
        status: HttpStatus.CREATED,
        message: this.Config.get<string>(
          'messageBase.PurchaseOrder.save.Success',
        ),
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>(
          'messageBase.PurchaseOrder.save.Failed',
        ),
        errors: error,
      };
    }
  }

  @MessagePattern('Purchase-Order-Delete')
  async PODelete(@Param('id') id: string): Promise<BaseResponse> {
    try {
      await this.POMaster.deletePurchaseOrder(id);
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
