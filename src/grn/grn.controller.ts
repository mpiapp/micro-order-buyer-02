import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
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

  @Get('list')
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'List Good Receive Note' })
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

  @Get('byId')
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'Get Good Receive Note' })
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

  @Get('Paginate')
  @ApiOperation({ summary: 'Get Good Receive Note Paginate' })
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

  @Post('GenerateCode')
  @ApiQuery({ name: 'po_number', type: String })
  @ApiOperation({ summary: 'Generate Code Good Receive Note' })
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

  @Put()
  @ApiQuery({ name: 'id', type: String })
  @ApiBody({ type: GRNUpdateDto })
  @ApiOperation({ summary: 'Save Good Receive Note' })
  @MessagePattern('Save-Good-Receive-Note')
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
}
