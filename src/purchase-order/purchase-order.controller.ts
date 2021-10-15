import { Body, Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PO } from './schemas/purchase-order.schema';
import { GenerateCodePurchaseOrderService } from './services/purchase-order-generate-code.service';
import { PurchaseOrderService } from './services/purchase-order.service';

@ApiTags('Purchase Orders')
@Controller('purchase-order')
export class PurchaseOrderController {
  constructor(
    private readonly POMaster: PurchaseOrderService,
    private readonly Generate: GenerateCodePurchaseOrderService,
  ) {}

  private spliteItems(code, items) {
    const hash = items.reduce(
      (previousValue, currentValue) => (
        previousValue[currentValue.vendorId]
          ? previousValue[currentValue.vendorId].push(currentValue)
          : (previousValue[currentValue.vendorId] = [currentValue]),
        previousValue
      ),
      {},
    );

    const groupData = Object.keys(hash).map((key) => ({
      vendorId: key,
      code_po: null,
      package: {
        code_package: null,
        items: hash[key],
      },
    }));

    const countNumber = 0;
    for (const row of groupData) {
      row.code_po = this.Generate.generateCodePurchaseOrder({
        code: code,
        cNumber: countNumber + 1,
      });
    }
    return groupData;
  }

  @Get('list')
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'List Master PO' })
  @MessagePattern('Purchase-Order-List-Data')
  async POList(@Query('id') id: string): Promise<PO[]> {
    return this.POMaster.listPurchaseOrder(id);
  }

  @Get('byId')
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'Get Master PO By Id' })
  @MessagePattern('Purchase-Order-Get-Data-By-Id')
  async POById(@Query('id') id: string): Promise<PO> {
    return this.POMaster.byIdPurchaseOrder(id);
  }

  @Get('search')
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'Search Master PO' })
  @MessagePattern('Purchase-Order-Search-Data')
  async POSearch(@Query('search') search: string): Promise<PO[]> {
    return this.POMaster.searchPurchaseOrder(search);
  }

  async POCreate(@Body() params): Promise<PO> {
    const { code, items } = params;
    params['vendors'] = this.spliteItems(code, items);
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
