import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ItemPRDto } from 'src/purchase-request/dto/Items.dto';
import { PackageService } from './services/package.service';

@ApiTags('Package')
@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  //   @Post()
  //   @ApiBody({ type: ItemPRDto })
  //   @ApiOperation({ summary: 'Split Package' })
  //   @MessagePattern('Split-Package')
  //   async splitPackage(
  //     @Param() id: string,
  //     vendorId: string,
  //     @Body() params: ItemPRDto[],
  //   ): Promise<any> {
  //     return this.packageService.splitPackage(id, vendorId, params);
  //   }

  @Get('list')
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiQuery({ name: 'status', type: 'string' })
  @ApiOperation({ summary: 'List Order' })
  @MessagePattern('Order-List-Data')
  async getOrder(@Query() id: string, status: string): Promise<any> {
    return this.packageService.getOrder(id, status);
  }

  @Get('byId')
  @ApiQuery({ name: 'id', type: 'string' })
  @ApiOperation({ summary: 'Get Order' })
  @MessagePattern('Order-ById')
  async getOrderById(@Query('id') id: string): Promise<any> {
    return this.packageService.getOrderById(id);
  }
}
