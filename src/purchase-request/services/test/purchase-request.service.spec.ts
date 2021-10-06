import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { SampleCreate } from '../../../../test/mocks/sample/Purchase-Request/sample.data.create.mock';
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
  it('should be create process request', async () => {
    expect(await service.createPurchaseRequest(SampleCreate)).toEqual(
      SampleCreate,
    );
  });
  it('should be delete process request', async () => {
    mockPurchaseRequest.findByIdAndUpdate.mockImplementation(() => {
      return {
        ...SampleCreate,
        isDeleted: true,
      };
    });
    expect(
      await service.deletePurchaseRequest({ id: expect.any(String) }),
    ).toEqual({
      ...SampleCreate,
      isDeleted: true,
    });
  });
});
