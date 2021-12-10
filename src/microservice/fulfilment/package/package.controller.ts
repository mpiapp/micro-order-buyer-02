import { Body, Controller, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { IncomingMessage } from './../config/interfaces/Income.interface';
import { BaseResponse } from './../config/interfaces/response.base.interface';
import { Helper } from './../utils/helper.utils';
import { ApprovalOfPaymentDto } from './dto/Approval.Payment.dto';
import { PackageStatusDto } from './dto/PackageSattus.dto';
import { PaginateDto } from './dto/Paginate.dto';
import { pickPackPackageDto } from './dto/pickPack.dto';
import { ProofOfPaymentDto } from './dto/Proof.Payment.dto';
import { IPackagesResponse } from './interfaces/response/Many.interface';
import { IPackagesPaginateResponse } from './interfaces/response/Paginate.interface';
import { IPackageResponse } from './interfaces/response/Single.interface';
import { PackageService } from './services/package.service';
import { PaginatePackageService } from './services/paginate-package.service';
import { PickPackService } from './services/pickpack.service';
import { ProofPaymentService } from './services/proof.payment.package.service';

@ApiTags('Package')
@Controller('package')
export class PackageController {
  constructor(
    private readonly packageService: PackageService,
    private readonly Config: ConfigService,
    private readonly paginateService: PaginatePackageService,
    private readonly pickPackService: PickPackService,
    private readonly helpService: Helper,
    private readonly paymentService: ProofPaymentService,
  ) {}

  @MessagePattern('package.get.all')
  async getPackages(
    @Body() message: IncomingMessage<{ id: string; status: string }>,
  ): Promise<IPackagesResponse> {
    try {
      const { id, status } = message.value;
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

  @MessagePattern('package.get.by.id')
  async getPackageById(
    @Body() message: IncomingMessage<string>,
  ): Promise<IPackageResponse> {
    try {
      const getOne = await this.packageService.getPackageById(message.value);
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

  @MessagePattern('package.paginate')
  async getPackagePaginate(
    @Body() message: IncomingMessage<PaginateDto>,
  ): Promise<IPackagesPaginateResponse> {
    const { skip, limit } = message.value;
    const getData = await this.paginateService.paginate(message.value);
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

  @EventPattern('package.proof.down.payment')
  async proofPackage(
    @Payload() message: IncomingMessage<{ params: ProofOfPaymentDto }>,
  ): Promise<BaseResponse> {
    try {
      await this.paymentService.upload(message.value.params);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>('messageBase.Package.upload.Success'),
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.Package.upload.Failed'),
        errors: error,
      };
    }
  }

  @EventPattern('package.approval.down.payment')
  async approvalPackage(
    @Payload() message: IncomingMessage<{ params: ApprovalOfPaymentDto }>,
  ): Promise<BaseResponse> {
    try {
      await this.paymentService.approved(message.value.params);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>(
          'messageBase.Package.approval.Success',
        ),
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.Package.approval.Failed'),
        errors: error,
      };
    }
  }

  @MessagePattern('package.pick')
  async pickPackage(
    @Body() message: IncomingMessage<pickPackPackageDto>,
  ): Promise<BaseResponse> {
    try {
      const { id, code_po, items, statuses, vendorId } = message.value;
      const validate = await this.paymentService.checking(id);
      if (!validate) {
        return {
          status: HttpStatus.NOT_ACCEPTABLE,
          message: this.Config.get<string>('messageBase.Package.check.Success'),
          errors: validate,
        };
      }
      const code = await this.helpService.generateCode({
        code: `${this.Config.get('initialCode.Pick.code')}-${code_po.slice(
          -3,
        )}`,
        count: 1,
        digits: this.Config.get('DIGITS_NUMBER_PICK'),
      });
      const total = this.helpService.SubTotal(items);
      await this.pickPackService.pickPackage({
        id: id,
        vendorId: vendorId,
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

  @MessagePattern('package.pack')
  async packPackage(
    @Body() message: IncomingMessage<pickPackPackageDto>,
  ): Promise<BaseResponse> {
    try {
      const { id, code_po, items, statuses, vendorId } = message.value;
      const code = await this.helpService.generateCode({
        code: `${this.Config.get('initialCode.Pack.code')}-${code_po.slice(
          -3,
        )}`,
        count: 1,
        digits: this.Config.get('DIGITS_NUMBER_PACK'),
      });
      const total = this.helpService.SUM(items);
      await this.pickPackService.packPackage({
        id: id,
        code: code,
        vendorId: vendorId,
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

  @MessagePattern('package.move')
  async updatePackage(
    @Body() message: IncomingMessage<{ params: PackageStatusDto }>,
  ): Promise<BaseResponse> {
    try {
      await this.packageService.addStatusPackage(message.value.params);
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
}
