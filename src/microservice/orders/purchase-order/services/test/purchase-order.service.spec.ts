import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderService } from '../purchase-order.service';
import { mockPurchaseOrder } from './../../../../../../test/mocks/services/PO.mocks';
import { sampleDataCreatePO } from './../../../../../../test/mocks/sample/Purchase-Order/sample.data.search.mock';
import { Order } from './../../../../../database/schema/orders.schema';

describe('PurchaseOrderService', () => {
  let service: PurchaseOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseOrderService,
        {
          provide: getModelToken(Order.name),
          useValue: mockPurchaseOrder,
        },
      ],
    }).compile();

    service = module.get<PurchaseOrderService>(PurchaseOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be delete master PO', async () => {
    expect(await service.deletePurchaseOrder(expect.any(String))).toEqual({
      ...sampleDataCreatePO,
      isDeleted: true,
    });
  });

  it('should be search purchase order by code', async () => {
    expect(await service.searchPurchaseOrder(expect.any(String))).toEqual([
      sampleDataCreatePO,
    ]);
  });

  it('should be get list purchase order', async () => {
    expect(await service.listPurchaseOrder(expect.any(String))).toEqual([
      sampleDataCreatePO,
    ]);
  });

  it('should be get by Id purchase order', async () => {
    expect(await service.byIdPurchaseOrder(expect.any(String))).toEqual(
      sampleDataCreatePO,
    );
  });

  it('should be get paginate purchase order ', async () => {
    expect(
      await service.getPaginate({
        keyId: expect.any(String),
        skip: 0,
        limit: 10,
      }),
    ).toEqual([sampleDataCreatePO]);
  });
});
