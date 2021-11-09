import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
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
import { Helper } from './../utils/helper.utils';
import { PRMoveDto } from './dto/PRMove.dto';
import { IPRMove } from './interfaces/type/IPRMove.interface';
import { PO } from './schemas/purchase-order.schema';
import { GenerateCoderService } from './services/purchase-order-generate-code.service';
import { PurchaseOrderService } from './services/purchase-order.service';

@ApiTags('Purchase Orders')
@Controller('purchase-order')
export class PurchaseOrderController {
  constructor(
    private readonly POMaster: PurchaseOrderService,
    private readonly Generate: GenerateCoderService,
    private readonly Config: ConfigService,
    private readonly HelperService: Helper,
  ) {}

  private async spliteItems(code, items) {
    const hash = items.reduce(
      (previousValue, currentValue) => (
        previousValue[currentValue.vendorId]
          ? previousValue[currentValue.vendorId].push(currentValue)
          : (previousValue[currentValue.vendorId] = [currentValue]),
        previousValue
      ),
      {},
    );

    const groupData = Object.keys(hash).map((key, value) => ({
      vendorId: key,
      code_po: this.Generate.generateCode({
        code: code,
        count: value + 1,
        digits: this.Config.get('DIGITS_NUMBER_PO'),
      }),
      packages: [
        {
          code_package: null,
          items: hash[key],
          statuses: [],
        },
      ],
      total: this.HelperService.SUM({ items: hash[key] }),
      statuses: [],
    }));

    return groupData;
  }

  @Get('list')
  @UseInterceptors(CacheInterceptor)
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'List Master PO' })
  @MessagePattern('Purchase-Order-List-Data')
  async POList(@Query('id') id: string): Promise<PO[]> {
    return this.POMaster.listPurchaseOrder(id);
  }

  @Get('byId')
  @UseInterceptors(CacheInterceptor)
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'Get Master PO By Id' })
  @MessagePattern('Purchase-Order-Get-Data-By-Id')
  async POById(@Query('id') id: string): Promise<PO> {
    return this.POMaster.byIdPurchaseOrder(id);
  }

  @Get('search')
  @UseInterceptors(CacheInterceptor)
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'Search Master PO' })
  @MessagePattern('Purchase-Order-Search-Data')
  async POSearch(@Query('search') search: string): Promise<PO[]> {
    return this.POMaster.searchPurchaseOrder(search);
  }

  @Post()
  @ApiBody({ type: PRMoveDto })
  @ApiOperation({ summary: 'Create Master PO' })
  @MessagePattern('Purchase-Order-Create')
  async POCreate(@Body() params: IPRMove): Promise<any> {
    const { code, items } = params;
    params['vendors'] = await this.spliteItems(code, items);
    delete params['items'];
    return this.POMaster.createPurchaseOrder(params);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'Delete Master PO' })
  @MessagePattern('Purchase-Order-Delete')
  async PODelete(@Param('id') id: string): Promise<PO> {
    return this.POMaster.deletePurchaseOrder(id);
  }
}
