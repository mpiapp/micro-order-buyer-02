import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { BaseResponse } from './../config/interfaces/response.base.interface';
import { GenerateCoderService } from './../purchase-order/services/purchase-order-generate-code.service';
import { DeliveryNoteCreateDto } from './dto/DeliveryNoteCreate.dto';
import { IDeliveryNotesResponse } from './interfaces/response/Many.interface';
import { IDeliveryNoteResponse } from './interfaces/response/Single.interface';
import { DeliveryNoteService } from './services/delivery-note.service';

@Controller('delivery-note')
export class DeliveryNoteController {
  constructor(
    private readonly generate: GenerateCoderService,
    private readonly Config: ConfigService,
    private readonly dnService: DeliveryNoteService,
  ) {}

  @Get('list')
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

  @Post()
  @ApiQuery({ name: 'po_number', type: String })
  @ApiOperation({ summary: 'Generate Code Delivery Note' })
  @MessagePattern('Generate-Code-Delivery-Note')
  async GenerateCode(@Query('po_number') po_number: string): Promise<string> {
    const searchCode = `DN-${po_number.slice(-3)}`;
    const countingNumber: number = await this.dnService.getCount(searchCode);
    return this.generate.generateCode({
      code: searchCode,
      count: countingNumber + 1,
      digits: this.Config.get('DIGITS_NUMBER_PACK'),
    });
  }
}
