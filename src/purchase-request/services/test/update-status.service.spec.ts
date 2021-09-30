import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PR } from '../../schemas/purchase-request.schema';
import { mockPurchaseRequest } from '../../../../test/mocks/services/PR.mocks';
import { UpdateStatusService } from '../update-status.service';
import { SampleCreate } from '../../../../test/mocks/sample/Process-Request/sample.data.create.mock';
import {
  SampleResultStatus,
  SampleStatus,
} from '../../../../test/mocks/sample/Status/sample.add.status.mock';

describe('UpdateStatusServiceService', () => {
  let service: UpdateStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateStatusService,
        {
          provide: getModelToken(PR.name),
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
    expect(
      await service.addStatus({ id: SampleCreate.id }, SampleStatus),
    ).toEqual(SampleResultStatus);
  });
});
