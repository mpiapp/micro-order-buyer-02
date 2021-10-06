import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PR } from './../../schemas/purchase-request.schema';
import { mockGenerate } from './../../../../test/mocks/services/Generate.mocks';
import { GenerateService } from '../generate.service';
import { SampleCode } from './../../../../test/mocks/sample/Purchase-Request/sample.code.mock';

describe('GenerateService', () => {
  let service: GenerateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenerateService,
        {
          provide: getModelToken(PR.name),
          useValue: mockGenerate,
        },
      ],
    }).compile();

    service = module.get<GenerateService>(GenerateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be generate code ', async () => {
    expect(await service.generateCode(SampleCode)).toEqual(SampleCode);
  });
});
