import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
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

  @Get('list')
  @UseInterceptors(CacheInterceptor)
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'List Delivery Note' })
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

  @Get('byId')
  @UseInterceptors(CacheInterceptor)
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'Get Delivery Note' })
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

  @Get('Paginate')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get Delivery Note Paginate' })
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

  @Post()
  @ApiBody({ type: DeliveryNoteCreateDto })
  @ApiOperation({ summary: 'Save Delivery Note' })
  @MessagePattern('Save-Delivery-Note')
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

  @Post('GenerateCode')
  @ApiQuery({ name: 'po_number', type: String })
  @ApiOperation({ summary: 'Generate Code Delivery Note' })
  @MessagePattern('Generate-Code-Delivery-Note')
  async GenerateCode(@Query('po_number') po_number: string): Promise<string> {
    const searchCode = `DN-${po_number.slice(-3)}`;
    const countingNumber: number = await this.dnService.getCount(searchCode);
    return this.generate.generateCode({
      code: searchCode,
      count: countingNumber + 1,
      digits: this.Config.get('DIGITS_NUMBER_DELIVERY_NOTE'),
    });
  }

  @Put()
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiBody({ type: DNUpdateDto })
  @ApiOperation({ summary: 'Update Delivery Note' })
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

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'Delete Delivery Note' })
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
