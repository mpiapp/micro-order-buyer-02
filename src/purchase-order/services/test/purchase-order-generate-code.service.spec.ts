import { Test, TestingModule } from '@nestjs/testing';
import { GenerateCoderService } from '../purchase-order-generate-code.service';
import { ConfigModule } from '@nestjs/config';
import { Helper } from './../../../utils/helper.utils';

describe('PurchaseOrderService', () => {
  let service: GenerateCoderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [GenerateCoderService, Helper],
    }).compile();

    service = module.get<GenerateCoderService>(GenerateCoderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be generate code number PO', async () => {
    expect(
      await service.generateCode({
        code: 'KPJ-01-01-00001',
        count: 1,
        digits: 3,
      }),
    ).toEqual(`KPJ-01-01-00001-001`);
  });

  it('should be generate code > 1', async () => {
    expect(
      await service.generateCode({
        code: 'KPJ-01-01-00001',
        count: 2,
        digits: 3,
      }),
    ).toEqual(`KPJ-01-01-00001-002`);
  });
});
