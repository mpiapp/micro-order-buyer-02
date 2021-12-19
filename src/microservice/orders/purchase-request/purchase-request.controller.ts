import {
  Body,
  CacheInterceptor,
  Controller,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { POPaginateDto } from './../purchase-order/dto/Paginate.dto';
import { Helper } from './../../../utils/helper.utils';
import { OrderCreateDto } from './../../../config/dto/order-create.dto';
import { OrderUpdateDto } from './../../../config/dto/order-update.dto';
import { IncomingMessage } from './../../../config/interfaces/Income.interface';
import { BaseResponse } from './../../../config/interfaces/response.base.interface';
import { ApprovalDto } from './dto/Approval.dto';
import { IPurchaseRequestsResponse } from './interfaces/response/Many.interface';
import { IPurchaseRequestPaginateResponse } from './interfaces/response/Paginate.interface';
import { IPurchaseRequestResponse } from './interfaces/response/Single.interface';
import { GenerateService } from './services/generate.service';
import { PurchaseRequestService } from './services/purchase-request.service';

@ApiTags('Purchase Request')
@Controller('PurchaseRequest')
export class PurchaseRequestController {
  constructor(
    private readonly PRMaster: PurchaseRequestService,
    private readonly Generate: GenerateService,
    private readonly Config: ConfigService,
    private readonly HelperService: Helper,
  ) {}

  @MessagePattern('purchase.request.save')
  async create(
    @Body() message: IncomingMessage<OrderCreateDto>,
  ): Promise<IPurchaseRequestResponse> {
    try {
      const { code, ...params } = message.value;
      const generate = await this.Generate.generateCode(code);
      const create = await this.PRMaster.createPurchaseRequest({
        ...params,
        code_pr: generate.code,
      });
      return {
        status: HttpStatus.CREATED,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.save.Success',
        ),
        data: create,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.save.Failed',
        ),
        errors: error,
        data: null,
      };
    }
  }

  @MessagePattern('purchase.request.update')
  async update(
    @Body() message: IncomingMessage<OrderUpdateDto>,
  ): Promise<IPurchaseRequestResponse> {
    try {
      const { value } = message;
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
  async delete(
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

  @UseInterceptors(CacheInterceptor)
  @MessagePattern('purchase.request.get.all')
  async getAll(
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
  @MessagePattern('purchase.request.get.items')
  async getItems(
    @Body() message: IncomingMessage<string>,
  ): Promise<IPurchaseRequestsResponse> {
    try {
      const getAll = await this.PRMaster.getItems(message.value);
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
  async getById(
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
  async search(
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

  @MessagePattern('purchase.request.paginate')
  async paginate(
    @Body() message: IncomingMessage<POPaginateDto>,
  ): Promise<IPurchaseRequestPaginateResponse> {
    const { skip, limit } = message.value;
    const getData = await this.PRMaster.getPaginate({
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

  @EventPattern('purchase.request.approval')
  async PRApproval(
    @Payload() message: IncomingMessage<ApprovalDto>,
  ): Promise<any> {
    const { id } = message.value;
    const { vendors, code_pr } = await this.PRMaster.getOneAny(id);

    let counting = 1;
    for (const rows of vendors) {
      rows.code_po = await this.HelperService.generateCode({
        code: code_pr,
        count: counting++,
        digits: this.Config.get('DIGITS_NUMBER_PO'),
      });

      const pack = await this.HelperService.group(
        rows.packages,
        rows.code_po,
        'New',
      );

      let status;
      /* istanbul ignore next */
      if (rows.down_payment !== null) {
        status = {
          name: 'Waiting Down Payment',
          timestamp: new Date(Date.now()),
        };
      } else {
        status = {
          name: 'Active',
          timestamp: new Date(Date.now()),
        };
      }
      rows.statuses.push(status);

      rows.packages = pack;
    }

    await this.PRMaster.updateVendor(id, vendors);

    return this.PRMaster.approvalPurchaseRequest(message.value);
  }
}
