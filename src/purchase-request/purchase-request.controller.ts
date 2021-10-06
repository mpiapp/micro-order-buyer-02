import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PRCreateDto } from './dto/CreatePR.dto';
import { PR } from './schemas/purchase-request.schema';
import { PurchaseRequestService } from './services/purchase-request.service';

@Controller('PurchaseRequest')
export class PurchaseRequestController {
  constructor(private readonly PRcreate: PurchaseRequestService) {}

  @MessagePattern('Purchase-Request-Create')
  async PRCreate(@Body() param: PRCreateDto): Promise<PR> {
    return this.PRcreate.createPurchaseRequest(param);
  }
}
