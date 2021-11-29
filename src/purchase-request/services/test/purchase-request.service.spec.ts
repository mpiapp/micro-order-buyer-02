import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { SampleCreate } from '../../../../test/mocks/sample/Purchase-Request/sample.data.create.mock';
import { SampleUpdate } from '../../../../test/mocks/sample/Purchase-Request/sample.data.update.mock';
import { mockPurchaseRequest } from '../../../../test/mocks/services/PR.mocks';
import { PurchaseRequestService } from '../purchase-request.service';
import { Order } from './../../../database/schema/orders.schema';

describe('PurchaseRequestService', () => {
  let service: PurchaseRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseRequestService,
        {
          provide: getModelToken(Order.name),
          useValue: mockPurchaseRequest,
        },
      ],
    }).compile();

    service = module.get<PurchaseRequestService>(PurchaseRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be create purchase request', async () => {
    expect(await service.createPurchaseRequest(SampleCreate)).toEqual(
      SampleCreate,
    );
  });

  it('should be update purchase request', async () => {
    mockPurchaseRequest.findByIdAndUpdate.mockImplementation(() => {
      return {
        ...SampleCreate,
        ...SampleUpdate,
      };
    });

    expect(await service.updatePurchaseRequest(SampleUpdate)).toEqual({
      ...SampleCreate,
      ...SampleUpdate,
    });
  });

  it('should be approval purchase request', async () => {
    expect(
      await service.approvalPurchaseRequest({
        id: expect.any(String),
        name: expect.any(String),
        note: expect.any(String),
        timestamp: new Date(),
      }),
    ).toEqual({
      ...SampleCreate,
      ...SampleUpdate,
    });
  });

  it('should be delete purchase request', async () => {
    mockPurchaseRequest.findByIdAndUpdate.mockImplementation(() => {
      return {
        ...SampleCreate,
        isDeleted: true,
      };
    });
    expect(await service.deletePurchaseRequest(expect.any(String))).toEqual({
      ...SampleCreate,
      isDeleted: true,
    });
  });

  it('should be search purchase request by code', async () => {
    expect(await service.searchPurchaseRequest(expect.any(String))).toEqual([
      SampleCreate,
    ]);
  });

  it('should be get list purchase request', async () => {
    expect(await service.listPurchaseRequest(expect.any(String))).toEqual([
      SampleCreate,
    ]);
  });

  it('should be get by Id purchase request', async () => {
    expect(await service.byIdPurchaseRequest(expect.any(String))).toEqual(
      SampleCreate,
    );
  });

  it('should get data paginate', async () => {
    expect(
      await service.getPaginate({
        keyId: expect.any(String),
        skip: 0,
        limit: 10,
      }),
    ).toEqual([SampleCreate]);
  });
});
