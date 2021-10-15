import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { SampleCreate } from '../../../../test/mocks/sample/Purchase-Request/sample.data.create.mock';
import { mockItemPurchaseRequest } from '../../../../test/mocks/services/Item.mocks';
import { sampleItem } from './../../../../test/mocks/sample/Products/sample.item.mock';
import { PurchaseOrderItemsService } from '../purchase-order-items.service';
import { PO } from './../../schemas/purchase-order.schema';

describe('PurchaseOrderItemsService', () => {
  let service: PurchaseOrderItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseOrderItemsService,
        {
          provide: getModelToken(PO.name),
          useValue: mockItemPurchaseRequest,
        },
      ],
    }).compile();

    service = module.get<PurchaseOrderItemsService>(PurchaseOrderItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be add items', async () => {
    SampleCreate.items.push(sampleItem);
    expect(
      await service.addItem(
        { _id: 'At126abasvt125' },
        { $push: { items: sampleItem } },
      ),
    ).toEqual({
      message: 'Update Success',
      status: true,
      id: expect.any(String),
    });
  });

  it('should be remove items', async () => {
    mockItemPurchaseRequest.updateOne.mockImplementation(() => {
      return {
        message: 'Remove Success',
        status: true,
        id: expect.any(String),
      };
    });
    expect(
      await service.removeItem(
        { _id: expect.any(String) },
        { $pull: { productId: sampleItem.productId } },
      ),
    ).toEqual({
      message: 'Remove Success',
      status: true,
      id: expect.any(String),
    });
  });

  it('should catch error remove items', async () => {
    mockItemPurchaseRequest.updateOne.mockImplementation(() => {
      throw new Error();
    });

    try {
      await service.removeItem(
        { _id: expect.any(String) },
        { $pull: { productId: sampleItem.productId } },
      );
    } catch (error) {
      expect(error);
    }
  });
});
