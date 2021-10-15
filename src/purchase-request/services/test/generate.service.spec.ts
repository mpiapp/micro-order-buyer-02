import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PR } from './../../schemas/purchase-request.schema';
import { mockGenerate } from './../../../../test/mocks/services/Generate.mocks';
import { GenerateService } from '../generate.service';
import { SampleCode } from './../../../../test/mocks/sample/Purchase-Request/sample.code.mock';
import { ConfigModule } from '@nestjs/config';
import { Helper } from './../../../utils/helper.utils';

describe('GenerateService', () => {
  let service: GenerateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        GenerateService,
        Helper,
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

  it('should be generate code first number ', async () => {
    expect(await service.generateCode(SampleCode)).toEqual({
      code: SampleCode.code + '-00001',
    });
  });

  it('should be generate code failed ', async () => {
    mockGenerate.findOne.mockImplementation((_param) => {
      return { code: _param.code.$regex + '00001' };
    });

    expect(
      await service.generateCode({
        code: SampleCode.code,
      }),
    ).toEqual({
      code: SampleCode.code + '-00002',
    });
  });
});
