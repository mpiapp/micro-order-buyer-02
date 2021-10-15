import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { SampleCreate } from '../../../../test/mocks/sample/Purchase-Request/sample.data.create.mock';
import { SampleUpdate } from '../../../../test/mocks/sample/Purchase-Request/sample.data.update.mock';
import { mockPurchaseRequest } from '../../../../test/mocks/services/PR.mocks';
import { PurchaseRequestService } from '../purchase-request.service';
import { PR } from '../../schemas/purchase-request.schema';

describe('PurchaseRequestService', () => {
  let service: PurchaseRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseRequestService,
        {
          provide: getModelToken(PR.name),
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

    expect(
      await service.updatePurchaseRequest(expect.any(String), SampleUpdate),
    ).toEqual({ ...SampleCreate, ...SampleUpdate });
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
    expect(
      await service.searchPurchaseRequest({ code: expect.any(String) }),
    ).toEqual([SampleCreate]);
  });

  it('should be get list purchase request', async () => {
    expect(
      await service.listPurchaseRequest({ buyerId: expect.any(String) }),
    ).toEqual([SampleCreate]);
  });

  it('should be get by Id purchase request', async () => {
    expect(await service.byIdPurchaseRequest(expect.any(String))).toEqual(
      SampleCreate,
    );
  });
});
