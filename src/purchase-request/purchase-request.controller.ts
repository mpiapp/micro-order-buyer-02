import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Helper } from './../utils/helper.utils';
import { BuyerDto } from './dto/Buyer.dto';
import { CodePRDto } from './dto/CodePR.dto';
import { PRCreateDto } from './dto/CreatePR.dto';
import { ItemPRDto } from './dto/Items.dto';
import { StatusDto } from './dto/Status.dto';
import { PRUpdateDto } from './dto/UpdatePR.dto';
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
  ) {}

  private async reCalculate(id) {
    const getPRbyId = await this.PRMaster.byIdPurchaseRequest(id);
    return this.PRMaster.updatePurchaseRequest(id, {
      total: this.HelperService.SUM(getPRbyId),
    });
  }

  @Post()
  @ApiBody({ type: PRCreateDto })
  @ApiOperation({ summary: 'Create Master PR' })
  @MessagePattern('Purchase-Request-Create')
  async PRCreate(@Body() param: PRCreateDto): Promise<PR> {
    const generateCodePR = await this.Generate.generateCode({
      code: param.code,
    });
    param.code = generateCodePR.code;
    this.HelperService.sumValidate(param);
    return this.PRMaster.createPurchaseRequest(param);
  }

  @Put()
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiBody({ type: PRUpdateDto })
  @ApiOperation({ summary: 'Update Master PR' })
  @MessagePattern('Purchase-Request-Update')
  async PRUpdate(@Query() id: string, @Body() param: PRUpdateDto): Promise<PR> {
    this.HelperService.sumValidate(param);
    return this.PRMaster.updatePurchaseRequest(id, param);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'Delete Master PR' })
  @MessagePattern('Purchase-Request-Delete')
  async PRDelete(@Param('id') id: string): Promise<PR> {
    return this.PRMaster.deletePurchaseRequest(id);
  }

  @Put('addItem')
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiBody({ type: ItemPRDto })
  @ApiOperation({ summary: 'Add Item Master PR' })
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

  @Put('updateItem')
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiBody({ type: ItemPRDto })
  @ApiOperation({ summary: 'Update Item Master PR' })
  @MessagePattern('Purchase-Request-Update-Item')
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

  @Put('deleteItem')
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiBody({ type: ItemPRDto })
  @ApiOperation({ summary: 'Remove Item Master PR' })
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

  @Get('list')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'List Master PR' })
  @MessagePattern('Purchase-Request-List-Data')
  async PRList(@Query() id: BuyerDto): Promise<PR[]> {
    return this.PRMaster.listPurchaseRequest(id);
  }

  @Get('byId')
  @UseInterceptors(CacheInterceptor)
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'Get Master PR By Id' })
  @MessagePattern('Purchase-Request-Get-Data-By-Id')
  async PRById(@Query('id') id: string): Promise<PR> {
    return this.PRMaster.byIdPurchaseRequest(id);
  }

  @Get('search')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Search Master PR' })
  @MessagePattern('Purchase-Request-Search-Data')
  async PRSearch(@Query() search: CodePRDto): Promise<PR[]> {
    return this.PRMaster.searchPurchaseRequest(search);
  }

  @Put('addStatus')
  @UseInterceptors(CacheInterceptor)
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiBody({ type: StatusDto })
  @ApiOperation({ summary: 'Add Status Master PR' })
  @MessagePattern('Purchase-Request-Add-Status-PR')
  async PRaddStatus(
    @Query() id: string,
    @Body() status: StatusDto,
  ): Promise<PR> {
    return this.Status.addStatus(id, status);
  }
}
