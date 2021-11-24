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
import { OrderCreateDto } from './../config/dto/order-create.dto';
import { OrderUpdateDto } from './../config/dto/order-update.dto';
import { IncomingMessage } from './../config/interfaces/Income.interface';
import { BaseResponse } from './../config/interfaces/response.base.interface';
import { StatusDto } from './dto/Status.dto';
import { IPurchaseRequestsResponse } from './interfaces/response/Many.interface';
import { IPurchaseRequestResponse } from './interfaces/response/Single.interface';
import { GenerateService } from './services/generate.service';
import { PurchaseRequestService } from './services/purchase-request.service';
import { UpdateStatusService } from './services/update-status.service';

@ApiTags('Purchase Request')
@Controller('PurchaseRequest')
export class PurchaseRequestController {
  constructor(
    private readonly PRMaster: PurchaseRequestService,
    private readonly Generate: GenerateService,
    private readonly Status: UpdateStatusService,
    private readonly Config: ConfigService,
  ) {}

  @MessagePattern('purchase.request.save')
  async PRCreate(
    @Body() message: IncomingMessage<OrderCreateDto>,
  ): Promise<BaseResponse> {
    try {
      const { value } = message;
      const generateCodePR = await this.Generate.generateCode(value.code_pr);
      value.code_pr = generateCodePR.code;
      await this.PRMaster.createPurchaseRequest(value);
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
  async PRaddStatus(@Body() message: IncomingMessage<StatusDto>): Promise<any> {
    return this.Status.addStatus(message.value);
  }
}
