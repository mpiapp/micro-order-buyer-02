import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PR } from '../../schemas/purchase-request.schema';
import { SampleCreate } from '../../../../test/mocks/sample/Purchase-Request/sample.data.create.mock';
import { UpdateItemsService } from '../update-items.service';
import { mockItemPurchaseRequest } from '../../../../test/mocks/services/Item.mocks';
import { sampleItem } from './../../../../test/mocks/sample/Products/sample.item.mock';

describe('UpdateItemsService', () => {
  let service: UpdateItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateItemsService,
        {
          provide: getModelToken(PR.name),
          useValue: mockItemPurchaseRequest,
        },
      ],
    }).compile();

    service = module.get<UpdateItemsService>(UpdateItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be add items', async () => {
    SampleCreate.items.push(sampleItem);
    expect(
      await service.addItemPurchaseRequest(
        { id: expect.any(String) },
        sampleItem,
      ),
    ).toEqual(SampleCreate);
  });

  it('should be update qty', async () => {
    expect(
      await service.updateQtyItemPurchaseRequest(
        { id: expect.any(String) },
        { ...sampleItem, quantity: 12 },
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
      await service.removeItemPurchaseRequest(
        { id: expect.any(String) },
        sampleItem,
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
      await service.removeItemPurchaseRequest(
        { id: expect.any(String) },
        sampleItem,
      );
    } catch (error) {
      expect(error);
    }
  });

  it('should catch error update qty', async () => {
    try {
      await service.updateQtyItemPurchaseRequest(
        { id: expect.any(String) },
        { ...sampleItem, quantity: 12 },
      );
    } catch (error) {
      expect(error);
    }
  });
});
