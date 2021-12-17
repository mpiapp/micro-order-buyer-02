import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryNote } from './../../../../database/schema/delivery-note.schema';
import { DeliveryNoteStatusService } from '../delivery-note-status.service';
import { mockStatusService } from './../../../../../test/mocks/services/Status.mocks';
import { sample_status } from './../../../../../test/mocks/sample/Status/sample.data.mocks';

describe('DeliveryNoteStatusService', () => {
  let service: DeliveryNoteStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeliveryNoteStatusService,
        {
          provide: getModelToken(DeliveryNote.name),
          useValue: mockStatusService,
        },
      ],
    }).compile();

    service = module.get<DeliveryNoteStatusService>(DeliveryNoteStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be push delivery note', async () => {
    expect(await service.pushStatus(sample_status)).toEqual(sample_status);
  });
});
