import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { mockGenerate } from './../../../../test/mocks/services/Generate.mocks';
import { GenerateService } from '../generate.service';
import { SampleCode } from './../../../../test/mocks/sample/Purchase-Request/sample.code.mock';
import { ConfigModule } from '@nestjs/config';
import { Helper } from './../../../utils/helper.utils';
import { Order } from './../../../database/schema/orders.schema';

describe('GenerateService', () => {
  let service: GenerateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        GenerateService,
        Helper,
        {
          provide: getModelToken(Order.name),
          useValue: mockGenerate,
        },
      ],
    }).compile();

    service = module.get<GenerateService>(GenerateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be generate code first number', async () => {
    expect(await service.generateCode(SampleCode)).toEqual({
      code: SampleCode + '-00001',
    });
  });

  it('should be generate code > 1', async () => {
    mockGenerate.find.mockReturnValue([1]);

    expect(await service.generateCode(SampleCode)).toEqual({
      code: SampleCode + '-00002',
    });
  });

  it('should be generate code failed', async () => {
    mockGenerate.find.mockReturnValue(null);

    expect(await service.generateCode(SampleCode)).toEqual({
      code: SampleCode + '-00001',
    });
  });
});
