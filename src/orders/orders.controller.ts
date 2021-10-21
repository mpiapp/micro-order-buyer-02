import { Body, Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IdPackage } from './../package/dto/IdPackage.dto';
import { GenerateCoderService } from './../purchase-order/services/purchase-order-generate-code.service';
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
    private readonly Generate: GenerateCoderService,
  ) {}

  @Get('list')
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiQuery({ name: 'status', type: 'string' })
  @ApiOperation({ summary: 'List Order Fulfillment' })
  @MessagePattern('Order-Fulfillment-List-Data')
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

  @Get('byId')
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'Get By Id Order Fulfillment' })
  @MessagePattern('Order-Fulfillment-ById')
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

  @Get('Paginate')
  @ApiOperation({ summary: 'Get Order Fulfillment Paginate' })
  @MessagePattern('Order-Fulfillment-Paginate')
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

  @Get('getIdPackage')
  @ApiBody({ type: IdPackage })
  @ApiOperation({ summary: 'Get Id Package' })
  @MessagePattern('Get-ID-Package')
  async getIdPackage(@Body() params: IdPackage): Promise<string> {
    const { id, count } = params;

    const getOrder = await this.ordersService.getOrderById(id);

    return this.Generate.generateCode({
      code: getOrder.code_po,
      count: getOrder.packages.length > 1 ? getOrder.packages.length : count,
      digits: this.Config.get('DIGITS_NUMBER_PACKAGE'),
    });
  }
}
