import {
  Body,
  CacheInterceptor,
  Controller,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import { StatusDto } from './../purchase-request/dto/Status.dto';
import { IDeliveryNotesResponse } from './../delivery-note/interfaces/response/Many.interface';
import { IDeliveryNotesPaginateResponse } from './../delivery-note/interfaces/response/Paginate.interface';
import { IDeliveryNoteResponse } from './../delivery-note/interfaces/response/Single.interface';
import { GrnPaginateDto } from './dto/Paginate.dto';
import { GRNUpdateDto } from './dto/Update.dto';
import { GrnService } from './services/grn.service';
import { Helper } from './../utils/helper.utils';
import { IncomingMessage } from './../config/interfaces/Income.interface';

@Controller('grn')
export class GrnController {
  constructor(
    private readonly helperService: Helper,
    private readonly Config: ConfigService,
    private readonly grnService: GrnService,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @MessagePattern('good.receive.note.get.all')
  async GRNList(
    @Body() message: IncomingMessage<string>,
  ): Promise<IDeliveryNotesResponse> {
    try {
      const getAll = await this.grnService.getAll(message.value);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>('messageBase.GRN.All.Success'),
        data: getAll,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.GRN.All.Failed'),
        data: null,
        errors: error,
      };
    }
  }

  @UseInterceptors(CacheInterceptor)
  @MessagePattern('good.receive.note.get.by.id')
  async GRNGetById(
    @Body() message: IncomingMessage<string>,
  ): Promise<IDeliveryNoteResponse> {
    try {
      const getOne = await this.grnService.getOne(message.value);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>('messageBase.GRN.One.Success'),
        data: getOne,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.GRN.One.Failed'),
        data: null,
        errors: error,
      };
    }
  }

  @UseInterceptors(CacheInterceptor)
  @MessagePattern('good.receive.note.paginate')
  async GRNPaginate(
    @Body() message: IncomingMessage<GrnPaginateDto>,
  ): Promise<IDeliveryNotesPaginateResponse> {
    const { skip, limit } = message.value;
    const getData = await this.grnService.getPaginate(message.value);
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

  @MessagePattern('good.receive.note.generate.code')
  async GenerateCode(
    @Body() message: IncomingMessage<string>,
  ): Promise<string> {
    const code = message.value;
    const searchCode = `GRN-${code.slice(-3)}`;
    const countingNumber: number = await this.grnService.getCount(searchCode);
    return this.helperService.generateCode({
      code: searchCode,
      count: countingNumber + 1,
      digits: this.Config.get('DIGITS_NUMBER_GRN'),
    });
  }

  @MessagePattern('good.receive.note.save')
  async GRNUpdate(
    @Body() message: IncomingMessage<{ id: string; params: GRNUpdateDto }>,
  ): Promise<IDeliveryNoteResponse> {
    try {
      const { id, params } = message.value;
      const save = await this.grnService.updateGRN(id, params);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>('messageBase.GRN.save.Success'),
        data: save,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.GRN.save.Failed'),
        data: null,
        errors: error,
      };
    }
  }

  @MessagePattern('Reject-Good-Receive-Note')
  async GRNRejected(
    @Body() message: IncomingMessage<{ id: string; params: StatusDto }>,
  ): Promise<IDeliveryNoteResponse> {
    try {
      const { id, params } = message.value;
      const save = await this.grnService.rejectGRN(id, params);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>('messageBase.GRN.reject.Success'),
        data: save,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.GRN.reject.Failed'),
        data: null,
        errors: error,
      };
    }
  }
}
