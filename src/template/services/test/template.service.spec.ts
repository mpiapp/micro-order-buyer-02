import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Template } from './../../schemas/template.schema';
import { TemplateService } from '../template.service';
import { sampleItem } from './../../../../test/mocks/sample/Products/sample.item.mock';

const SampleTemplateCreate = {
  buyerId: '617364617364617364617344',
  items: [
    {
      productId: expect.any(String),
      quantity: 14,
    },
    {
      productId: expect.any(String),
      quantity: 14,
    },
  ],
  statuses: [
    {
      name: 'Draft',
      timestamp: new Date('2021-10-10 20:00'),
    },
  ],
  createdBy: '615fc7256dce435b915538ec',
};

const mockServiceTemplate = {
  create: jest.fn().mockImplementation((dto) => dto),
  findByIdAndUpdate: jest.fn().mockImplementation(() => {
    SampleTemplateCreate.items.push(sampleItem);
    return SampleTemplateCreate;
  }),
  updateOne: jest.fn().mockImplementation(() => {
    return {
      message: 'Update Success',
      status: true,
      id: expect.any(String),
    };
  }),
};
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
    expect(
      await service.deleteTemplate({ id: '617364617364617364617344' }),
    ).toEqual(SampleTemplateCreate);
  });

  it('should be add items template', async () => {
    SampleTemplateCreate.items.push(sampleItem);
    expect(
      await service.addItemTemplate({ id: expect.any(String) }, sampleItem),
    ).toEqual(SampleTemplateCreate);
  });

  it('should be update qty', async () => {
    expect(
      await service.updateQtyItemTemplate(
        { id: expect.any(String) },
        { ...sampleItem, quantity: 12 },
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
      await service.removeItemTemplate({ id: expect.any(String) }, sampleItem),
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
      await service.removeItemTemplate({ id: expect.any(String) }, sampleItem);
    } catch (error) {
      expect(error);
    }
  });

  it('should catch error update qty', async () => {
    try {
      await service.updateQtyItemTemplate(
        { id: expect.any(String) },
        { ...sampleItem, quantity: 12 },
      );
    } catch (error) {
      expect(error);
    }
  });
});
