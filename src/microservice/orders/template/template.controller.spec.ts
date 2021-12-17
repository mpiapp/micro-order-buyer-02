import { ConfigModule, ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from './../../../config/configuration';
import {
  SampleTemplateCreate,
  SampleTemplateUpdate,
} from './../../../../test/mocks/sample/Template/Sample.mocks';
import { Template } from './../../../database/schema/template.schema';
import { TemplateService } from './services/template.service';
import { TemplateController } from './template.controller';
import { mockControllerTemplate } from './../../../../test/mocks/services/Controller.mocks';
import { CacheModule } from '@nestjs/common';
import { MessageSample } from './../../../../test/mocks/sample/message/sample.message.mock';

describe('TemplateController', () => {
  let controller: TemplateController;
  let config: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
        CacheModule.register(),
      ],
      controllers: [TemplateController],
      providers: [
        TemplateService,
        {
          provide: getModelToken(Template.name),
          useValue: mockControllerTemplate,
        },
      ],
    }).compile();

    controller = module.get<TemplateController>(TemplateController);
    config = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create template', async () => {
    expect(
      await controller.TemplateCreate({
        ...MessageSample,
        value: SampleTemplateCreate,
      }),
    ).toEqual({
      errors: null,
      status: 201,
      message: config.get('messageBase.Template.save.Success'),
      data: SampleTemplateCreate,
    });
  });

  it('should be create template failed', async () => {
    mockControllerTemplate.create.mockImplementation(() => {
      throw new Error();
    });

    try {
      await controller.TemplateCreate({
        ...MessageSample,
        value: SampleTemplateCreate,
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: config.get('messageBase.Template.save.Failed'),
        data: SampleTemplateCreate,
      });
    }
  });

  it('should be delete template', async () => {
    expect(
      await controller.TemplateDelete({
        ...MessageSample,
        value: expect.any(String),
      }),
    ).toEqual({
      errors: null,
      message: config.get('messageBase.Template.delete.Success'),
      status: 200,
    });
  });

  it('should be update template', async () => {
    expect(
      await controller.TemplateUpdate({
        ...MessageSample,
        value: SampleTemplateUpdate,
      }),
    ).toEqual({
      errors: null,
      message: config.get('messageBase.Template.update.Success'),
      status: 200,
    });
  });

  it('should be create template failed', async () => {
    mockControllerTemplate.findByIdAndUpdate.mockImplementation(() => {
      throw new Error();
    });

    try {
      await controller.TemplateDelete({
        ...MessageSample,
        value: expect.any(String),
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: config.get('messageBase.Template.delete.Failed'),
        data: SampleTemplateCreate,
      });
    }
  });

  it('should be update template failed', async () => {
    try {
      await controller.TemplateUpdate({
        ...MessageSample,
        value: SampleTemplateUpdate,
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: config.get('messageBase.Template.update.Failed'),
        data: SampleTemplateCreate,
      });
    }
  });

  it('should get list Template Success', async () => {
    expect(
      await controller.TemplateGetList({
        ...MessageSample,
        value: expect.any(String),
      }),
    ).toEqual({
      errors: null,
      status: 200,
      message: config.get('messageBase.Template.All.Success'),
      data: [SampleTemplateCreate],
    });
  });

  it('should get Template By Id Success', async () => {
    expect(
      await controller.TemplateGetById({
        ...MessageSample,
        value: expect.any(String),
      }),
    ).toEqual({
      errors: null,
      status: 200,
      message: config.get('messageBase.Template.One.Success'),
      data: SampleTemplateCreate,
    });
  });

  it('should get Template By Id Failed', async () => {
    mockControllerTemplate.findById.mockImplementation(() => {
      throw new Error();
    });
    try {
      await controller.TemplateGetById({
        ...MessageSample,
        value: expect.any(String),
      });
    } catch (error) {
      expect(error).toBe({
        errors: error,
        status: 400,
        message: config.get('messageBase.Template.One.Failed'),
        data: null,
      });
    }
  });

  it('should Search Template Success', async () => {
    expect(
      await controller.TemplateSearch({
        ...MessageSample,
        value: expect.any(String),
      }),
    ).toEqual({
      errors: null,
      status: 200,
      message: config.get('messageBase.Template.Search.Success'),
      data: [SampleTemplateCreate],
    });
  });

  it('should get list Template Failed', async () => {
    mockControllerTemplate.find.mockImplementation(() => {
      throw new Error();
    });
    try {
      await controller.TemplateGetList({
        ...MessageSample,
        value: expect.any(String),
      });
    } catch (error) {
      expect(error).toBe({
        errors: error,
        status: 400,
        message: config.get('messageBase.Template.All.Failed'),
        data: null,
      });
    }
  });

  it('should Search Template Failed', async () => {
    try {
      await controller.TemplateSearch({
        ...MessageSample,
        value: expect.any(String),
      });
    } catch (error) {
      expect(error).toBe({
        errors: error,
        status: 400,
        message: config.get('messageBase.Template.Search.Failed'),
        data: null,
      });
    }
  });

  it('should be paginate Template', async () => {
    mockControllerTemplate.aggregate.mockReturnValue([
      { data: [SampleTemplateCreate], metadata: [{ total: 1 }] },
    ]);

    expect(
      await controller.TemplatePaginate({
        ...MessageSample,
        value: {
          keyId: expect.any(String),
          skip: 0,
          limit: 10,
        },
      }),
    ).toEqual({
      count: 1,
      page: 0,
      limit: 10,
      data: [SampleTemplateCreate],
    });
  });

  it('should be paginate Template Metadata Null', async () => {
    mockControllerTemplate.aggregate.mockReturnValue([
      { data: [SampleTemplateCreate], metadata: [] },
    ]);

    expect(
      await controller.TemplatePaginate({
        ...MessageSample,
        value: {
          keyId: expect.any(String),
          skip: 0,
          limit: 10,
        },
      }),
    ).toEqual({
      count: 0,
      page: 0,
      limit: 10,
      data: [SampleTemplateCreate],
    });
  });

  it('should be paginate Template failed', async () => {
    mockControllerTemplate.aggregate.mockReturnValue(false);

    expect(
      await controller.TemplatePaginate({
        ...MessageSample,
        value: {
          keyId: expect.any(String),
          skip: 0,
          limit: 10,
        },
      }),
    ).toEqual({
      count: 0,
      page: 0,
      limit: 10,
      data: null,
    });
  });
});
