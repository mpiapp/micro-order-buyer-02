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
import * as mongoose from 'mongoose';
import { BaseResponse } from './../config/interfaces/response.base.interface';
import { Helper } from './../utils/helper.utils';
import { BuyerDto } from './dto/Buyer.dto';
import { CodePRDto } from './dto/CodePR.dto';
import { PRCreateDto } from './dto/CreatePR.dto';
import { ItemPRDto } from './dto/Items.dto';
import { StatusDto } from './dto/Status.dto';
import { PRUpdateDto } from './dto/UpdatePR.dto';
import { IPurchaseRequestsResponse } from './interfaces/response/Many.interface';
import { IPurchaseRequestResponse } from './interfaces/response/Single.interface';
import { PR } from './schemas/purchase-request.schema';
import { GenerateService } from './services/generate.service';
import { PurchaseRequestService } from './services/purchase-request.service';
import { UpdateItemsService } from './services/update-items.service';
import { UpdateStatusService } from './services/update-status.service';

@ApiTags('Purchase Request')
@Controller('PurchaseRequest')
export class PurchaseRequestController {
  constructor(
    private readonly PRMaster: PurchaseRequestService,
    private readonly Generate: GenerateService,
    private readonly Items: UpdateItemsService,
    private readonly Status: UpdateStatusService,
    private readonly HelperService: Helper,
    private readonly Config: ConfigService,
  ) {}

  private async reCalculate(id) {
    const getPRbyId = await this.PRMaster.byIdPurchaseRequest(id);
    return this.PRMaster.updatePurchaseRequest(id, {
      total: this.HelperService.SUM(getPRbyId),
    });
  }

  @MessagePattern('Purchase-Request-Save')
  async PRCreate(@Body() params: PRCreateDto): Promise<BaseResponse> {
    try {
      const generateCodePR = await this.Generate.generateCode({
        code: params.code,
      });
      params.code = generateCodePR.code;
      this.HelperService.sumValidate(params);
      this.PRMaster.createPurchaseRequest(params);
      return {
        status: HttpStatus.CREATED,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.save.Success',
        ),
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.save.Failed',
        ),
        errors: error,
      };
    }
  }

  @MessagePattern('Purchase-Request-Update')
  async PRUpdate(
    @Query() id: string,
    @Body() param: PRUpdateDto,
  ): Promise<IPurchaseRequestResponse> {
    try {
      this.HelperService.sumValidate(param);
      const update = await this.PRMaster.updatePurchaseRequest(id, param);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.update.Success',
        ),
        data: update,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.update.Failed',
        ),
        data: null,
        errors: error,
      };
    }
  }

  @MessagePattern('Purchase-Request-Delete')
  async PRDelete(@Param('id') id: string): Promise<BaseResponse> {
    try {
      await this.PRMaster.deletePurchaseRequest(id);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.delete.Success',
        ),
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.delete.Failed',
        ),
        errors: error,
      };
    }
  }

  @MessagePattern('Purchase-Request-Add-Item')
  async PRaddItem(
    @Query('id') id: string,
    @Body() product: ItemPRDto,
  ): Promise<PR> {
    const addQty = await this.Items.addItem(
      {
        $and: [
          {
            _id: new mongoose.Types.ObjectId(id),
            'items.productId': product.productId,
          },
        ],
      },
      { $inc: { 'items.$.quantity': product.quantity } },
    );

    if (!addQty.matchedCount) {
      await this.Items.addItem(
        { _id: new mongoose.Types.ObjectId(id) },
        { $push: { items: product } },
      );
      return this.reCalculate(id);
    }

    return this.reCalculate(id);
  }

  @MessagePattern('Purchase-Request-Update-Qty-Item')
  async PRUpdateItem(
    @Query('id') id: string,
    @Body() product: ItemPRDto,
  ): Promise<PR> {
    await this.Items.addItem(
      {
        $and: [
          {
            _id: new mongoose.Types.ObjectId(id),
            'items.productId': product.productId,
          },
        ],
      },
      { $inc: { 'items.$.quantity': product.quantity } },
    );
    return this.reCalculate(id);
  }

  @MessagePattern('Purchase-Request-Remove-Item')
  async PRRemoveItem(
    @Query('id') id: string,
    @Body() product: ItemPRDto,
  ): Promise<PR> {
    await this.Items.removeItem(
      { _id: new mongoose.Types.ObjectId(id) },
      { $pull: { items: { productId: product.productId } } },
    );
    return this.reCalculate(id);
  }

  @UseInterceptors(CacheInterceptor)
  @MessagePattern('Purchase-Request-List-Data')
  async PRList(@Query() id: BuyerDto): Promise<IPurchaseRequestsResponse> {
    try {
      const getAll = await this.PRMaster.listPurchaseRequest(id);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.All.Success',
        ),
        data: getAll,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.All.Failed',
        ),
        data: null,
        errors: error,
      };
    }
  }

  @UseInterceptors(CacheInterceptor)
  @MessagePattern('Purchase-Request-Get-Data-By-Id')
  async PRById(@Query('id') id: string): Promise<IPurchaseRequestResponse> {
    try {
      const getOne = await this.PRMaster.byIdPurchaseRequest(id);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.One.Success',
        ),
        data: getOne,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.One.Failed',
        ),
        data: null,
        errors: error,
      };
    }
  }

  @UseInterceptors(CacheInterceptor)
  @MessagePattern('Purchase-Request-Search-Data')
  async PRSearch(
    @Query() search: CodePRDto,
  ): Promise<IPurchaseRequestsResponse> {
    try {
      const getAll = await this.PRMaster.searchPurchaseRequest(search);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.Search.Success',
        ),
        data: getAll,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>(
          'messageBase.PurchaseRequest.Search.Failed',
        ),
        data: null,
        errors: error,
      };
    }
  }

  @UseInterceptors(CacheInterceptor)
  @MessagePattern('Purchase-Request-Add-Status-PR')
  async PRaddStatus(
    @Query() id: string,
    @Body() status: StatusDto,
  ): Promise<PR> {
    return this.Status.addStatus(id, status);
  }
}
