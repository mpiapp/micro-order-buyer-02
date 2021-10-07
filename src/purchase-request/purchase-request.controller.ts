import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PRCreateDto } from './dto/CreatePR.dto';
import { ItemDto } from './dto/Items.dto';
import { PRUpdateDto } from './dto/UpdatePR.dto';
import { PRIdDto } from './dto/_IdPR.dto';
import { PR } from './schemas/purchase-request.schema';
import { GenerateService } from './services/generate.service';
import { PurchaseRequestService } from './services/purchase-request.service';
import { UpdateItemsService } from './services/update-items.service';

@ApiTags('Purchase Request')
@Controller('PurchaseRequest')
export class PurchaseRequestController {
  constructor(
    private readonly PRMaster: PurchaseRequestService,
    private readonly Generate: GenerateService,
    private readonly Items: UpdateItemsService,
    private readonly Config: ConfigService,
  ) {}

  private sumValidate(param) {
    const sum: number = this.SUM(param);
    if (sum !== param.total) {
      throw new Error(this.Config.get<string>('error.total'));
    }
  }

  private SUM(param): number {
    const initialValue = 0;
    const calculate: number = param.items.reduce(function (
      total,
      currentValue,
    ) {
      // eslint-disable-next-line prettier/prettier
      return (currentValue.price * currentValue.quantity) + total;
    },
    initialValue);
    return calculate;
  }

  private async reCalculate(id) {
    const getPRbyId = await this.PRMaster.byIdPurchaseRequest(id);
    return this.PRMaster.updatePurchaseRequest(id, {
      total: this.SUM(getPRbyId),
    });
  }

  @Post()
  @ApiBody({ type: PRCreateDto })
  @ApiOperation({ summary: 'Create PR' })
  @MessagePattern('Purchase-Request-Create')
  async PRCreate(@Body() param: PRCreateDto): Promise<PR> {
    const generateCodePR = await this.Generate.generateCode({
      code: param.code,
    });
    param.code = generateCodePR.code;
    this.sumValidate(param);
    return this.PRMaster.createPurchaseRequest(param);
  }

  async PRUpdate(@Query('id') id: PRIdDto, param: PRUpdateDto): Promise<PR> {
    this.sumValidate(param);
    return this.PRMaster.updatePurchaseRequest(id, param);
  }

  async PRDelete(@Param('id') id: PRIdDto): Promise<PR> {
    return this.PRMaster.deletePurchaseRequest(id);
  }

  async PRaddItem(@Query('id') id: PRIdDto, product: ItemDto): Promise<PR> {
    this.Items.addItemPurchaseRequest(id, product);
    return this.reCalculate(id);
  }

  async PRUpdateItem(@Query('id') id: PRIdDto, product: ItemDto): Promise<PR> {
    this.Items.updateQtyItemPurchaseRequest(id, product);
    return this.reCalculate(id);
  }

  async PRRemoveItem(@Query('id') id: PRIdDto, product: ItemDto): Promise<PR> {
    this.Items.removeItemPurchaseRequest(id, product);
    return this.reCalculate(id);
  }
}
