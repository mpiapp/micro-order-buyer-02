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
import { StatusDto } from './../purchase-request/dto/Status.dto';
import { IDeliveryNotesResponse } from './../delivery-note/interfaces/response/Many.interface';
import { IDeliveryNotesPaginateResponse } from './../delivery-note/interfaces/response/Paginate.interface';
import { IDeliveryNoteResponse } from './../delivery-note/interfaces/response/Single.interface';
import { GenerateCoderService } from './../purchase-order/services/purchase-order-generate-code.service';
import { GrnPaginateDto } from './dto/Paginate.dto';
import { GRNUpdateDto } from './dto/Update.dto';
import { GrnService } from './services/grn.service';

@Controller('grn')
export class GrnController {
  constructor(
    private readonly generate: GenerateCoderService,
    private readonly Config: ConfigService,
    private readonly grnService: GrnService,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @MessagePattern('Good-Receive-Note-List-Data')
  async GRNList(@Query('id') id: string): Promise<IDeliveryNotesResponse> {
    try {
      const getAll = await this.grnService.getAll(id);
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
  @MessagePattern('Good-Receive-Note-ById')
  async GRNGetById(@Query('id') id: string): Promise<IDeliveryNoteResponse> {
    try {
      const getOne = await this.grnService.getOne(id);
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
  @MessagePattern('Good-Receive-Note-Paginate')
  async GRNPaginate(
    @Query() params: GrnPaginateDto,
  ): Promise<IDeliveryNotesPaginateResponse> {
    const { skip, limit } = params;
    const getData = await this.grnService.getPaginate(params);
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

  @MessagePattern('Generate-Code-Good-Receive-Note')
  async GenerateCode(@Query('po_number') po_number: string): Promise<string> {
    const searchCode = `GRN-${po_number.slice(-3)}`;
    const countingNumber: number = await this.grnService.getCount(searchCode);
    return this.generate.generateCode({
      code: searchCode,
      count: countingNumber + 1,
      digits: this.Config.get('DIGITS_NUMBER_GRN'),
    });
  }

  @MessagePattern('Good-Receive-Note-Save')
  async GRNUpdate(
    @Query('id') id: string,
    @Body() params: GRNUpdateDto,
  ): Promise<IDeliveryNoteResponse> {
    try {
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
    @Query('id') id: string,
    @Body() params: StatusDto,
  ): Promise<IDeliveryNoteResponse> {
    try {
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
