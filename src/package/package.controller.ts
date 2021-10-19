import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/config/interfaces/response.base.interface';
import { GenerateCoderService } from './../purchase-order/services/purchase-order-generate-code.service';
import { IdPackage } from './dto/IdPackage.dto';
import { PackageDto } from './dto/Package.dto';
import { IPackagesResponse } from './interfaces/response/Many.interface';
import { IPackageResponse } from './interfaces/response/Single.interface';
import { PackageService } from './services/package.service';

@ApiTags('Package')
@Controller('package')
export class PackageController {
  constructor(
    private readonly packageService: PackageService,
    private readonly Generate: GenerateCoderService,
    private readonly Config: ConfigService,
  ) {}

  @Get('list')
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiQuery({ name: 'status', type: 'string' })
  @ApiOperation({ summary: 'List Order' })
  @MessagePattern('Order-List-Data')
  async getOrder(
    @Query('id') id: string,
    status: string,
  ): Promise<IPackagesResponse> {
    try {
      const getAll = await this.packageService.getOrder(id, status);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>('messageBase.Package.All.Success'),
        data: getAll,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.Package.All.Failed'),
        data: null,
        errors: error,
      };
    }
  }

  @Get('getIdPackage')
  @ApiBody({ type: IdPackage })
  @ApiOperation({ summary: 'List Order' })
  @MessagePattern('Order-Get-ID-Package')
  async getIdPackage(@Body() params: IdPackage): Promise<string> {
    const { id, count } = params;

    const getOrder = await this.packageService.getOrderById(id);

    return this.Generate.generateCode({
      code: getOrder.code_po,
      count: getOrder.packages.length > 1 ? getOrder.packages.length : count,
      digits: this.Config.get('DIGITS_NUMBER_PACKAGE'),
    });
  }

  @Get('byId')
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'Get Order' })
  @MessagePattern('Order-ById')
  async getOrderById(@Query('id') id: string): Promise<IPackageResponse> {
    try {
      const getOne = await this.packageService.getOrderById(id);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>('messageBase.Package.One.Success'),
        data: getOne,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.Package.One.Failed'),
        data: null,
        errors: error,
      };
    }
  }

  @Post()
  @ApiBody({ type: PackageDto })
  @ApiOperation({ summary: 'Save Split Package' })
  @MessagePattern('Save-Split-Package')
  async splitPackage(
    @Param('id') id: string,
    vendorId: string,
    @Body() params: PackageDto[],
  ): Promise<BaseResponse> {
    try {
      await this.packageService.splitPackage(id, vendorId, params);
      return {
        status: HttpStatus.CREATED,
        message: this.Config.get<string>('messageBase.Package.save.Success'),
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.Package.save.Failed'),
        errors: error,
      };
    }
  }
}
