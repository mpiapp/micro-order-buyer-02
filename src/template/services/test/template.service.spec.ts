import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Template } from './../../schemas/template.schema';
import { TemplateService } from '../template.service';
import { SampleTemplateCreate } from './../../../../test/mocks/sample/Template/Sample.mocks';
import { mockServiceTemplate } from './../../../../test/mocks/services/Template.mocks';

describe('TemplateService', () => {
  let service: TemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplateService,
        {
          provide: getModelToken(Template.name),
          useValue: mockServiceTemplate,
        },
      ],
    }).compile();

    service = module.get<TemplateService>(TemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create template', async () => {
    expect(await service.createTemplate(SampleTemplateCreate)).toEqual(
      SampleTemplateCreate,
    );
  });

  it('should be delete template', async () => {
    expect(await service.deleteTemplate('617364617364617364617344')).toEqual(
      '617364617364617364617344',
    );
  });

  it('should be list template', async () => {
    expect(await service.listTemplate(expect.any(String))).toEqual([
      SampleTemplateCreate,
    ]);
  });

  it('should be get template  by Id', async () => {
    expect(await service.getByIdTemplate(expect.any(String))).toEqual(
      SampleTemplateCreate,
    );
  });

  it('should be search template', async () => {
    expect(await service.searchTemplate(expect.any(String))).toEqual([
      SampleTemplateCreate,
    ]);
  });
});
