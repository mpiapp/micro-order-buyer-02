import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from './../config/configuration';
import { mockDeliveryNoteService } from './../../test/mocks/services/DN.mocks';
import { DeliveryNoteController } from './delivery-note.controller';
import { DN } from './schemas/delivery-note.schema';
import { DeliveryNoteService } from './services/delivery-note.service';
import { Helper } from './../utils/helper.utils';
import { GenerateCoderService } from './../purchase-order/services/purchase-order-generate-code.service';
import { sampleDeliveryNote } from './../../test/mocks/sample/Delivery-Note/sample.mock';

const mockDeliveryNoteController = {
  ...mockDeliveryNoteService,
};

describe('DeliveryNoteController', () => {
  let controller: DeliveryNoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      controllers: [DeliveryNoteController],
      providers: [
        DeliveryNoteService,
        Helper,
        GenerateCoderService,
        {
          provide: getModelToken(DN.name),
          useValue: mockDeliveryNoteController,
        },
      ],
    }).compile();

    controller = module.get<DeliveryNoteController>(DeliveryNoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be generate code Delivery Note', async () => {
    expect(await controller.GenerateCode('KPJ-01-01-00001-001')).toEqual(
      'DN-001-002',
    );
  });

  it('should be create delivery note', async () => {
    expect(await controller.DeliveryNoteCreate(sampleDeliveryNote)).toEqual({
      errors: null,
      status: 201,
      message: 'Save Delivery Note Success',
    });
  });

  it('should be create delivery note failed', async () => {
    mockDeliveryNoteController.create.mockRejectedValue(new Error());

    try {
      await controller.DeliveryNoteCreate(sampleDeliveryNote);
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        message: 'Save Delivery Note Failed',
      });
    }
  });

  it('should be getOne delivery note', async () => {
    expect(await controller.DeliveryNoteById(expect.any(String))).toEqual({
      errors: null,
      status: 200,
      data: sampleDeliveryNote,
      message: 'Get One Delivery Note Success',
    });
  });

  it('should be getOne delivery note failed', async () => {
    mockDeliveryNoteController.findById.mockRejectedValue(new Error());

    try {
      await controller.DeliveryNoteById(expect.any(String));
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        data: null,
        message: 'Get One Delivery Note Failed',
      });
    }
  });

  it('should be getAll delivery note', async () => {
    expect(await controller.DeliveryNoteList(expect.any(String))).toEqual({
      errors: null,
      status: 200,
      data: [sampleDeliveryNote],
      message: 'Get Delivery Notes Success',
    });
  });

  it('should be get Paginate delivery note', async () => {
    mockDeliveryNoteController.aggregate.mockReturnValue([
      { data: [sampleDeliveryNote], metadata: [{ total: 1 }] },
    ]);

    expect(
      await controller.DeliveryNotePaginate({
        vendorId: expect.any(String),
        skip: 0,
        limit: 10,
      }),
    ).toEqual({
      page: 0,
      limit: 10,
      data: [sampleDeliveryNote],
      count: 1,
    });
  });

  it('should be get Paginate delivery note Metadata Null', async () => {
    mockDeliveryNoteController.aggregate.mockReturnValue([
      { data: [sampleDeliveryNote], metadata: [] },
    ]);

    expect(
      await controller.DeliveryNotePaginate({
        vendorId: expect.any(String),
        skip: 0,
        limit: 10,
      }),
    ).toEqual({
      count: 0,
      page: 0,
      limit: 10,
      data: [sampleDeliveryNote],
    });
  });

  it('should be get Paginate delivery failed', async () => {
    mockDeliveryNoteController.aggregate.mockReturnValue(false);

    expect(
      await controller.DeliveryNotePaginate({
        vendorId: expect.any(String),
        skip: 0,
        limit: 10,
      }),
    ).toEqual({
      count: 0,
      page: 0,
      limit: 10,
      data: null,
    });
  });

  it('should be getAll delivery note failed', async () => {
    mockDeliveryNoteController.find.mockRejectedValue(new Error());

    try {
      await controller.DeliveryNoteList(expect.any(String));
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        data: null,
        message: 'Get Delivery Notes Failed',
      });
    }
  });
});
