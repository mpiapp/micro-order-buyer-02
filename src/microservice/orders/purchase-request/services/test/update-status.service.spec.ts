import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Order } from './../../../../../database/schema/orders.schema';
import { mockPurchaseRequest } from './../../../../../../test/mocks/services/PR.mocks';
import { UpdateStatusService } from './../update-status.service';
import { sampleStatus } from './../../../../../../test/mocks/sample/Status/sample.data.mocks';

describe('UpdateStatusServiceService', () => {
  let service: UpdateStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateStatusService,
        {
          provide: getModelToken(Order.name),
          useValue: mockPurchaseRequest,
        },
      ],
    }).compile();

    service = module.get<UpdateStatusService>(UpdateStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be add status', async () => {
    mockPurchaseRequest.findByIdAndUpdate.mockReturnValue(sampleStatus);
    expect(await service.addStatus(sampleStatus)).toEqual({
      ...sampleStatus,
    });
  });
});
