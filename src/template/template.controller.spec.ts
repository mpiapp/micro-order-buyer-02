import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from './../config/configuration';
import { sampleItem } from './../../test/mocks/sample/Products/sample.item.mock';
import { SampleTemplateCreate } from './../../test/mocks/sample/Template/Sample.mocks';
import { Template } from './schemas/template.schema';
import { TemplateItemsService } from './services/template-items.service';
import { TemplateService } from './services/template.service';
import { TemplateController } from './template.controller';
import { mockControllerTemplate } from './../../test/mocks/services/Controller.mocks';
import { CacheModule } from '@nestjs/common';

describe('TemplateController', () => {
  let controller: TemplateController;

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
        TemplateItemsService,
        {
          provide: getModelToken(Template.name),
          useValue: mockControllerTemplate,
        },
      ],
    }).compile();

    controller = module.get<TemplateController>(TemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create template', async () => {
    expect(await controller.TemplateCreate(SampleTemplateCreate)).toEqual({
      errors: null,
      status: 201,
      message: 'Template Create Success',
      data: SampleTemplateCreate,
    });
  });

  it('should be create template failed', async () => {
    mockControllerTemplate.create.mockImplementation(() => {
      throw new Error();
    });

    try {
      await controller.TemplateCreate(SampleTemplateCreate);
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: 'Template Create Failed',
        data: SampleTemplateCreate,
      });
    }
  });

  it('should be delete template', async () => {
    expect(await controller.TemplateDelete(expect.any(String))).toEqual({
      errors: null,
      message: 'Template Delete Success',
      status: 200,
    });
  });

  it('should be create template failed', async () => {
    mockControllerTemplate.findByIdAndUpdate.mockImplementation(() => {
      throw new Error();
    });

    try {
      await controller.TemplateDelete(expect.any(String));
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: 'Template Delete Failed',
        data: SampleTemplateCreate,
      });
    }
  });

  it('should update add Item template Success', async () => {
    expect(
      await controller.TemplateAddItem(expect.any(String), sampleItem),
    ).toEqual({
      errors: null,
      message: 'Add Item Success',
      status: 201,
    });
  });

  it('should update change qty Item template Success', async () => {
    expect(
      await controller.TemplateUpdateItem(expect.any(String), sampleItem),
    ).toEqual({
      errors: null,
      message: 'Update Qty Item Success',
      status: 200,
    });
  });

  it('should update remove Item Template Success', async () => {
    expect(
      await controller.TemplateRemoveItem(expect.any(String), sampleItem),
    ).toEqual({
      errors: null,
      message: 'Remove Item Success',
      status: 200,
    });
  });

  it('should update add Item Template Failed', async () => {
    mockControllerTemplate.updateOne.mockImplementation(() => {
      return false;
    });
    try {
      await controller.TemplateAddItem(expect.any(String), sampleItem);
    } catch (error) {
      expect(error).toEqual(error);
    }
  });

  it('should update change qty Item template Failed', async () => {
    mockControllerTemplate.updateOne.mockImplementation(() => {
      throw new Error();
    });

    try {
      await controller.TemplateUpdateItem(expect.any(String), sampleItem);
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        message: 'Update Qty Item Failed',
        status: 412,
      });
    }
  });

  it('should update remove Item Template Failed', async () => {
    try {
      await controller.TemplateRemoveItem(expect.any(String), sampleItem);
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        message: 'Remove Item Failed',
        status: 412,
      });
    }
  });

  it('should get list Template Success', async () => {
    expect(await controller.TemplateGetList(expect.any(String))).toEqual({
      errors: null,
      status: 200,
      message: 'Template Get All Success',
      data: [SampleTemplateCreate],
    });
  });

  it('should get Template By Id Success', async () => {
    expect(await controller.TemplateGetById(expect.any(String))).toEqual({
      errors: null,
      status: 200,
      message: 'Template Get One Success',
      data: SampleTemplateCreate,
    });
  });

  it('should get Template By Id Failed', async () => {
    mockControllerTemplate.findById.mockImplementation(() => {
      throw new Error();
    });
    try {
      await controller.TemplateGetById(expect.any(String));
    } catch (error) {
      expect(error).toBe({
        errors: error,
        status: 400,
        message: 'Template Get One Success',
        data: null,
      });
    }
  });

  it('should Search Template Success', async () => {
    expect(await controller.TemplateSearch(expect.any(String))).toEqual({
      errors: null,
      status: 200,
      message: 'Template Search Success',
      data: [SampleTemplateCreate],
    });
  });

  it('should get list Template Failed', async () => {
    mockControllerTemplate.find.mockImplementation(() => {
      throw new Error();
    });
    try {
      await controller.TemplateGetList(expect.any(String));
    } catch (error) {
      expect(error).toBe({
        errors: error,
        status: 400,
        message: 'Template Get All Success',
        data: null,
      });
    }
  });

  it('should Search Template Failed', async () => {
    try {
      await controller.TemplateSearch(expect.any(String));
    } catch (error) {
      expect(error).toBe({
        errors: error,
        status: 400,
        message: 'Template Search Success',
        data: null,
      });
    }
  });

  it('should update add Item Template PR Failed', async () => {
    mockControllerTemplate.updateOne.mockImplementation(() => {
      return false;
    });
    expect(
      await controller.TemplateAddItem(expect.any(String), sampleItem),
    ).toEqual({
      errors: null,
      message: 'Add Item Success',
      status: 201,
    });
  });

  it('should update add Item Template PR Failed', async () => {
    mockControllerTemplate.updateOne.mockImplementation(() => {
      return {
        matchedCount: 1,
      };
    });
    expect(
      await controller.TemplateAddItem(expect.any(String), sampleItem),
    ).toEqual({
      errors: null,
      message: 'Add Item Success',
      status: 201,
    });
  });
});
