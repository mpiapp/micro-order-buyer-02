import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PO } from './../../schemas/purchase-order.schema';
import { PurchaseOrderService } from '../purchase-order.service';

const mockPurchaseOrder = {
  create: jest.fn().mockImplementation((dto) => {
    return dto;
  }),
};

const sampleDataCreatePO = {
  id: '615fc7256dce435b915538ec',
  code: 'KPJ-12-10-00001',
  buyerId: '617364617364617364617344',
  date: new Date('2021-10-10'),
  items: [
    {
      productId: expect.any(String),
      payment_terms: {
        term: 'down_payment',
        price: 5000,
      },
      code_po: 'KPJ-12-10-00001-001',
      quantity: 14,
      price: 10000,
    },
    {
      productId: expect.any(String),
      code_po: 'KPJ-12-10-00001-002',
      quantity: 14,
      price: 10000,
    },
  ],
  total: 0,
  statuses: [
    {
      name: 'Open',
      timestamp: new Date('2021-10-10 20:00'),
    },
  ],
  createdBy: '615fc7256dce435b915538ec',
};

describe('PurchaseOrderService', () => {
  let service: PurchaseOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseOrderService,
        {
          provide: getModelToken(PO.name),
          useValue: mockPurchaseOrder,
        },
      ],
    }).compile();

    service = module.get<PurchaseOrderService>(PurchaseOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create master PO', async () => {
    expect(await service.createPurchaseOrder(sampleDataCreatePO)).toEqual(
      sampleDataCreatePO,
    );
  });
});
