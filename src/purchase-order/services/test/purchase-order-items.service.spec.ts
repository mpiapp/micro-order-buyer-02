import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderItemsService } from '../purchase-order-items.service';
import { PO } from './../../schemas/purchase-order.schema';
import { sampleItemBaseChange } from './../../../../test/mocks/sample/Items/sample.base.mock';

const POItemMOck = {
  findOneAndUpdate: jest.fn().mockReturnValue({
    ...sampleItemBaseChange,
    statuses: [
      {
        name: 'Rejected',
        timestamp: new Date('2021-10-25'),
      },
    ],
  }),
};

describe('PurchaseOrderItemsService', () => {
  let service: PurchaseOrderItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseOrderItemsService,
        {
          provide: getModelToken(PO.name),
          useValue: POItemMOck,
        },
      ],
    }).compile();

    service = module.get<PurchaseOrderItemsService>(PurchaseOrderItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be approved qty change items from vendor', async () => {
    POItemMOck.findOneAndUpdate.mockReturnValue({
      ...sampleItemBaseChange,
      quantity: 10,
    });
    expect(await service.changeQty(expect.any(String), 10)).toEqual({
      ...sampleItemBaseChange,
      quantity: 10,
    });
  });

  it('should be approved price change items from vendor', async () => {
    POItemMOck.findOneAndUpdate.mockReturnValue({
      ...sampleItemBaseChange,
      price: 10000,
    });
    expect(await service.changePrice(expect.any(String), 10000)).toEqual({
      ...sampleItemBaseChange,
      price: 10000,
    });
  });

  // it('should be approved product change items from vendor', async () => {
  //   expect(
  //     await service.changeProduct('At126abasvt125', sampleItemProductChange),
  //   ).toEqual({
  //     message: 'Update Success',
  //     status: true,
  //     id: expect.any(String),
  //   });
  // });

  it('should be reject change items from vendor', async () => {
    POItemMOck.findOneAndUpdate.mockReturnValue({
      ...sampleItemBaseChange,
      statuses: [
        {
          name: 'Rejected',
          timestamp: new Date('2021-10-25'),
        },
      ],
    });

    expect(await service.changeRejected(expect.any(String))).toEqual({
      ...sampleItemBaseChange,
      statuses: [
        {
          name: 'Rejected',
          timestamp: new Date('2021-10-25'),
        },
      ],
    });
  });
});
