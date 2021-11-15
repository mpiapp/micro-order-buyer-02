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
import { BaseResponse } from './../config/interfaces/response.base.interface';
import { GenerateCoderService } from './../purchase-order/services/purchase-order-generate-code.service';
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
    private readonly generate: GenerateCoderService,
    private readonly Config: ConfigService,
    private readonly dnService: DeliveryNoteService,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @MessagePattern('Delivery-Note-List-Data')
  async DeliveryNoteList(
    @Query('id') id: string,
  ): Promise<IDeliveryNotesResponse> {
    try {
      const getAll = await this.dnService.getAll(id);
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
  @MessagePattern('Delivery-Note-ById')
  async DeliveryNoteById(
    @Query('id') id: string,
  ): Promise<IDeliveryNoteResponse> {
    try {
      const getOne = await this.dnService.getOne(id);
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

  @MessagePattern('Delivery-Note-Paginate')
  async DeliveryNotePaginate(
    @Query() params: DNPaginateDto,
  ): Promise<IDeliveryNotesPaginateResponse> {
    const { skip, limit } = params;
    const getData = await this.dnService.getPaginate(params);
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

  @MessagePattern('Delivery-Note-Save')
  async DeliveryNoteCreate(
    @Body() params: DeliveryNoteCreateDto,
  ): Promise<BaseResponse> {
    try {
      await this.dnService.create(params);
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

  @MessagePattern('Generate-Code-Delivery-Note')
  async GenerateCode(@Query('po_number') po_number: string): Promise<string> {
    const searchCode = `${this.Config.get(
      'initialCode.DeliveryNote.code',
    )}-${po_number.slice(-3)}`;
    const countingNumber: number = await this.dnService.getCount(searchCode);
    return this.generate.generateCode({
      code: searchCode,
      count: countingNumber + 1,
      digits: this.Config.get('DIGITS_NUMBER_DELIVERY_NOTE'),
    });
  }

  @MessagePattern('Update-Delivery-Note')
  async DeliveryNoteUpdate(
    @Query('id') id: string,
    @Body() params: DNUpdateDto,
  ): Promise<IDeliveryNoteResponse> {
    try {
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

  @MessagePattern('Delivery-Note-Delete')
  async DeliveryNoteRemove(@Param('id') id: string): Promise<BaseResponse> {
    try {
      await this.dnService.delete(id);
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
