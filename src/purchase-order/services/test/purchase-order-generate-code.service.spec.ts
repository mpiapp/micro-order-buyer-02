import { Test, TestingModule } from '@nestjs/testing';
import { GenerateCodePurchaseOrderService } from '../purchase-order-generate-code.service';
import { ConfigModule } from '@nestjs/config';
import { Helper } from './../../../utils/helper.utils';

describe('PurchaseOrderService', () => {
  let service: GenerateCodePurchaseOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [GenerateCodePurchaseOrderService, Helper],
    }).compile();

    service = module.get<GenerateCodePurchaseOrderService>(
      GenerateCodePurchaseOrderService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be generate code number PO', async () => {
    expect(
      await service.generateCodePurchaseOrder({
        code: 'KPJ-01-01-00001',
        cNumber: 1,
      }),
    ).toEqual(`KPJ-01-01-00001-001`);
  });
});
