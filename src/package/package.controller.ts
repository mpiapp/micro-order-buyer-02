import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from './../config/interfaces/response.base.interface';
import { GenerateCoderService } from './../purchase-order/services/purchase-order-generate-code.service';
import { Helper } from './../utils/helper.utils';
import { MoveItemPackageDto } from './dto/MovePackage.dto';
import { PackageDto } from './dto/Package.dto';
import { PaginateDto } from './dto/Paginate.dto';
import { PicknPackPackageDto } from './dto/PicknPack.dto';
import { IPackagesResponse } from './interfaces/response/Many.interface';
import { IPackagesPaginateResponse } from './interfaces/response/Paginate.interface';
import { IPackageResponse } from './interfaces/response/Single.interface';
import { PackageService } from './services/package.service';
import { PaginatePackageService } from './services/paginate-package.service';
import { PicknPackService } from './services/picknpack.service';

@ApiTags('Package')
@Controller('package')
export class PackageController {
  constructor(
    private readonly Generate: GenerateCoderService,
    private readonly packageService: PackageService,
    private readonly Config: ConfigService,
    private readonly paginateService: PaginatePackageService,
    private readonly picknpackService: PicknPackService,
    private readonly helpService: Helper,
  ) {}

  @Get('list')
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiQuery({ name: 'status', type: 'string' })
  @ApiOperation({ summary: 'List Package' })
  @MessagePattern('Package-List-Data')
  async getPackages(
    @Query('id') id: string,
    @Query('status') status: string,
  ): Promise<IPackagesResponse> {
    try {
      const getAll = await this.packageService.getPackages(id, status);
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

  @Get('byId')
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'Get Package' })
  @MessagePattern('Package-ById')
  async getPackageById(@Query('id') id: string): Promise<IPackageResponse> {
    try {
      const getOne = await this.packageService.getPackageById(id);
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

  @Get('Paginate')
  @ApiOperation({ summary: 'Get Package Paginate' })
  @MessagePattern('Package-Paginate')
  async getPackagePaginate(
    @Query() params: PaginateDto,
  ): Promise<IPackagesPaginateResponse> {
    const { skip, limit } = params;
    const getData = await this.paginateService.paginate(params);
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
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiQuery({ name: 'vendorId', type: 'string' })
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

  @Post()
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiBody({ type: PicknPackPackageDto })
  @ApiOperation({ summary: 'Pick Package' })
  @MessagePattern('Pick-Package')
  async pickPackage(
    @Param('id') id: string,
    @Body() params: PicknPackPackageDto,
  ): Promise<BaseResponse> {
    try {
      const { code_po, items, statuses } = params;
      const code = this.Generate.generateCode({
        code: `PICK-${code_po.slice(-3)}`,
        count: 1,
        digits: this.Config.get('DIGITS_NUMBER_PICK'),
      });
      const total = this.helpService.SUM(params);
      await this.picknpackService.pickPackage({
        id: id,
        code: code,
        items: items,
        total: total,
        statuses: statuses,
      });
      return {
        status: HttpStatus.CREATED,
        message: this.Config.get<string>('messageBase.Package.pick.Success'),
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.Package.pick.Failed'),
        errors: error,
      };
    }
  }

  @Post()
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiBody({ type: PicknPackPackageDto })
  @ApiOperation({ summary: 'Pack Package' })
  @MessagePattern('Pack-Package')
  async packPackage(
    @Param('id') id: string,
    @Body() params: PicknPackPackageDto,
  ): Promise<BaseResponse> {
    try {
      const { code_po, items, statuses } = params;
      const code = this.Generate.generateCode({
        code: `PACK-${code_po.slice(-3)}`,
        count: 1,
        digits: this.Config.get('DIGITS_NUMBER_PACK'),
      });
      const total = this.helpService.SUM(params);
      await this.picknpackService.pickPackage({
        id: id,
        code: code,
        items: items,
        total: total,
        statuses: statuses,
      });
      return {
        status: HttpStatus.CREATED,
        message: this.Config.get<string>('messageBase.Package.pack.Success'),
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.Package.pack.Failed'),
        errors: error,
      };
    }
  }

  @Put()
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiBody({ type: MoveItemPackageDto })
  @ApiOperation({ summary: 'Move Items Package' })
  @MessagePattern('Move-Items-Package')
  async updatePackage(
    @Param('id') id: string,
    @Body() params: MoveItemPackageDto,
  ): Promise<BaseResponse> {
    try {
      const { from_package, to_package, items } = params;
      this.removeArray(from_package, items);
      await this.packageService.pushItemPackage(to_package, items);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>('messageBase.Package.update.Success'),
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.Package.update.Failed'),
        errors: error,
      };
    }
  }

  private removeArray(id, items) {
    for (const rows of items) {
      this.packageService.pullItemPackage(id, rows.ProductId);
    }
  }
}
