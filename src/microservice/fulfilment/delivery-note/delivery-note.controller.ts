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
import { Helper } from './../utils/helper.utils';
import { IncomingMessage } from './../config/interfaces/Income.interface';
import { BaseResponse } from './../config/interfaces/response.base.interface';
import { DeliveryNoteCreateDto } from './dto/DeliveryNoteCreate.dto';
import { DNUpdateDto } from './dto/DeliveryNoteUpdate.dto';
import { DNPaginateDto } from './dto/Paginate.dto';
import { IDeliveryNotesResponse } from './interfaces/response/Many.interface';
import { IDeliveryNotesPaginateResponse } from './interfaces/response/Paginate.interface';
import { IDeliveryNoteResponse } from './interfaces/response/Single.interface';
import { DeliveryNoteService } from './services/delivery-note.service';

@ApiTags('Delivery-Note')
@Controller('delivery-note')
export class DeliveryNoteController {
  constructor(
    private readonly helperService: Helper,
    private readonly Config: ConfigService,
    private readonly dnService: DeliveryNoteService,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @MessagePattern('delivery.note.get.all')
  async DeliveryNoteList(
    @Body() message: IncomingMessage<string>,
  ): Promise<IDeliveryNotesResponse> {
    try {
      const getAll = await this.dnService.getAll(message.value);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>(
          'messageBase.DeliveryNote.All.Success',
        ),
        data: getAll,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.DeliveryNote.All.Failed'),
        data: null,
        errors: error,
      };
    }
  }

  @UseInterceptors(CacheInterceptor)
  @MessagePattern('delivery.note.get.by.id')
  async DeliveryNoteById(
    @Body() message: IncomingMessage<string>,
  ): Promise<IDeliveryNoteResponse> {
    try {
      const getOne = await this.dnService.getOne(message.value);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>(
          'messageBase.DeliveryNote.One.Success',
        ),
        data: getOne,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.DeliveryNote.One.Failed'),
        data: null,
        errors: error,
      };
    }
  }

  @MessagePattern('delivery.note.paginate')
  async DeliveryNotePaginate(
    @Body() message: IncomingMessage<DNPaginateDto>,
  ): Promise<IDeliveryNotesPaginateResponse> {
    const { skip, limit } = message.value;
    const getData = await this.dnService.getPaginate(message.value);
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

  @MessagePattern('delivery.note.save')
  async DeliveryNoteCreate(
    @Body() message: IncomingMessage<{ create: DeliveryNoteCreateDto }>,
  ): Promise<BaseResponse> {
    try {
      const { code_po, delivery } = message.value.create;
      const searchCode = `${this.Config.get(
        'initialCode.DeliveryNote.code',
      )}-${code_po.slice(-3)}`;
      const countingNumber: number = await this.dnService.getCount(searchCode);
      const code = await this.helperService.generateCode({
        code: searchCode,
        count: countingNumber + 1,
        digits: this.Config.get('DIGITS_NUMBER_PICK'),
      });

      await this.dnService.create({
        ...message.value.create,
        ...{ ...delivery, code: code },
      });

      return {
        status: HttpStatus.CREATED,
        message: this.Config.get<string>(
          'messageBase.DeliveryNote.save.Success',
        ),
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>(
          'messageBase.DeliveryNote.save.Failed',
        ),
        errors: error,
      };
    }
  }

  @MessagePattern('delivery.note.generate.code')
  async GenerateCode(
    @Body() message: IncomingMessage<string>,
  ): Promise<string> {
    const code = message.value;
    const searchCode = `${this.Config.get(
      'initialCode.DeliveryNote.code',
    )}-${code.slice(-3)}`;
    const countingNumber: number = await this.dnService.getCount(searchCode);
    return this.helperService.generateCode({
      code: searchCode,
      count: countingNumber + 1,
      digits: this.Config.get('DIGITS_NUMBER_DELIVERY_NOTE'),
    });
  }

  @MessagePattern('delivery.note.update')
  async DeliveryNoteUpdate(
    @Body() message: IncomingMessage<DNUpdateDto>,
  ): Promise<IDeliveryNoteResponse> {
    try {
      const { id, ...params } = message.value;
      const update = await this.dnService.update(id, params);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>(
          'messageBase.DeliveryNote.update.Success',
        ),
        data: update,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>(
          'messageBase.DeliveryNote.update.Failed',
        ),
        errors: error,
        data: null,
      };
    }
  }

  @MessagePattern('delivery.note.delete')
  async DeliveryNoteRemove(
    @Body() message: IncomingMessage<string>,
  ): Promise<BaseResponse> {
    try {
      await this.dnService.delete(message.value);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>(
          'messageBase.DeliveryNote.delete.Success',
        ),
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>(
          'messageBase.DeliveryNote.delete.Failed',
        ),
        errors: error,
      };
    }
  }
}
