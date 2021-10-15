import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Template } from './../../schemas/template.schema';
import { sampleItem } from './../../../../test/mocks/sample/Products/sample.item.mock';
import { TemplateItemsService } from '../template-items.service';
import { SampleTemplateCreate } from './../../../../test/mocks/sample/Template/Sample.mocks';
import { mockServiceTemplate } from './../../../../test/mocks/services/Template.mocks';

describe('TemplateItemsService', () => {
  let service: TemplateItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplateItemsService,
        {
          provide: getModelToken(Template.name),
          useValue: mockServiceTemplate,
        },
      ],
    }).compile();

    service = module.get<TemplateItemsService>(TemplateItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be add items', async () => {
    SampleTemplateCreate.items.push(sampleItem);
    expect(
      await service.addItem(
        { _id: 'At126abasvt125' },
        { $push: { items: sampleItem } },
      ),
    ).toEqual({
      message: 'Update Success',
      status: true,
      id: expect.any(String),
    });
  });

  it('should be remove items', async () => {
    mockServiceTemplate.updateOne.mockImplementation(() => {
      return {
        message: 'Remove Success',
        status: true,
        id: expect.any(String),
      };
    });
    expect(
      await service.removeItem(
        { _id: 'At126abasvt125' },
        { $pull: { productId: sampleItem.productId } },
      ),
    ).toEqual({
      message: 'Remove Success',
      status: true,
      id: expect.any(String),
    });
  });

  it('should catch error remove items', async () => {
    mockServiceTemplate.updateOne.mockImplementation(() => {
      throw new Error();
    });

    try {
      await service.removeItem(
        { _id: 'At126abasvt125' },
        { $pull: { productId: sampleItem.productId } },
      );
    } catch (error) {
      expect(error);
    }
  });
});
