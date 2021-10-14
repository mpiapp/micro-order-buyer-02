import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PO } from './../purchase-order/schemas/purchase-order.schema';
import { PR } from './../purchase-request/schemas/purchase-request.schema';
import { mockPurchaseRequest } from './../../test/mocks/services/PR.mocks';
import { PurchaseOrderService } from './../purchase-order/services/purchase-order.service';
import { PurchaseRequestService } from './../purchase-request/services/purchase-request.service';
import { ApprovalController } from './approval.controller';

const mockPurchaseOrder = {
  create: jest.fn().mockImplementation((dto) => {
    return dto;
  }),
};

const sampleDataPR = {
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

describe('ApprovalController', () => {
  let controller: ApprovalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApprovalController],
      providers: [],
    }).compile();

    controller = module.get<ApprovalController>(ApprovalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should approvals', async () => {
  //   expect(await controller.approved(sampleDataPR)).toBe(
  //     'Success Submit PR to PO',
  //   );
  // });
});
