import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DN } from './../../../delivery-note/schemas/delivery-note.schema';
import { GrnService } from '../grn.service';
import { mockGRNService } from './../../../../test/mocks/services/GRN.mocks';
import { sampleGRN } from './../../../../test/mocks/sample/GoodReceiveNote/Sample.Data.mocks';

describe('GrnService', () => {
  let service: GrnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GrnService,
        {
          provide: getModelToken(DN.name),
          useValue: mockGRNService,
        },
      ],
    }).compile();

    service = module.get<GrnService>(GrnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be getAll grn', async () => {
    expect(await service.getAll(expect.any(String))).toEqual([sampleGRN]);
  });

  it('should be getOne grn', async () => {
    expect(await service.getOne(expect.any(String))).toEqual(sampleGRN);
  });

  it('should be Paginate grn', async () => {
    expect(await service.getPaginate(expect.any(String))).toEqual([sampleGRN]);
  });

  it('should be update items', async () => {
    expect(await service.updateGRN(expect.any(String), sampleGRN)).toEqual(
      sampleGRN,
    );
  });

  it('should be count document', async () => {
    expect(await service.getCount('DN-001')).toEqual(1);
  });

  it('should be count document if = 0', async () => {
    mockGRNService.find.mockReturnValue(0);
    expect(await service.getCount('DN-001')).toEqual(0);
  });
});
