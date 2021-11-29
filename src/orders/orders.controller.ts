import { Body, Controller, HttpStatus, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Helper } from './../utils/helper.utils';
import { IdPackage } from './../package/dto/IdPackage.dto';
import { PaginateDto } from './../package/dto/Paginate.dto';
import { IOrdersResponse } from './interfaces/response/Many.interface';
import { IOrderPaginateResponse } from './interfaces/response/Paginate.interface';
import { IOrderResponse } from './interfaces/response/Single.interface';
import { OrderPaginateService } from './services/order-paginate.service';
import { OrdersService } from './services/orders.service';

@ApiTags('Order-Fulfillment')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly Config: ConfigService,
    private readonly paginateService: OrderPaginateService,
    private readonly helperService: Helper,
  ) {}

  @MessagePattern('order.fulfillment.get.all')
  async getOrder(
    @Query('id') id: string,
    @Query('status') status: string,
  ): Promise<IOrdersResponse> {
    try {
      const getAll = await this.ordersService.getOrders(id, status);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>('messageBase.Orders.All.Success'),
        data: getAll,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.Orders.All.Failed'),
        data: null,
        errors: error,
      };
    }
  }

  @MessagePattern('order.fulfillment.get.by.id')
  async getOrderById(@Query('id') id: string): Promise<IOrderResponse> {
    try {
      const getOne = await this.ordersService.getOrderById(id);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>('messageBase.Orders.One.Success'),
        data: getOne,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.Orders.One.Failed'),
        data: null,
        errors: error,
      };
    }
  }

  @MessagePattern('order.fulfillment.paginate')
  async getOrderPaginate(
    @Query() params: PaginateDto,
  ): Promise<IOrderPaginateResponse> {
    const { skip, limit } = params;
    const getData = await this.paginateService.paginate(params);
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

  @MessagePattern('order.fulfillment.get.id.package')
  async getIdPackage(@Body() params: IdPackage): Promise<string> {
    const { id, count } = params;

    const getOrder = await this.ordersService.getOrderById(id);

    return this.helperService.generateCode({
      code: getOrder.code_po,
      count: getOrder.packages.length > 1 ? getOrder.packages.length : count,
      digits: this.Config.get('DIGITS_NUMBER_PACKAGE'),
    });
  }
}
