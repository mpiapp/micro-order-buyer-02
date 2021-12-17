import { ConfigModule, ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from './../../../config/configuration';
import { mockDeliveryNoteService } from './../../../../test/mocks/services/DN.mocks';
import { DeliveryNoteController } from './delivery-note.controller';
import { DeliveryNote } from './../../../database/schema/delivery-note.schema';
import { DeliveryNoteService } from './services/delivery-note.service';
import { Helper } from './../../../utils/helper.utils';
import {
  sampleDeliveryNote,
  sampleDeliveryNoteControllerNew,
} from './../../../../test/mocks/sample/Delivery-Note/sample.mock';
import { CacheModule } from '@nestjs/common';
import { MessageSample } from './../../../../test/mocks/sample/message/sample.message.mock';

const mockDeliveryNoteController = {
  ...mockDeliveryNoteService,
};

describe('DeliveryNoteController', () => {
  let controller: DeliveryNoteController;
  let config: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
        CacheModule.register(),
      ],
      controllers: [DeliveryNoteController],
      providers: [
        DeliveryNoteService,
        Helper,
        {
          provide: getModelToken(DeliveryNote.name),
          useValue: mockDeliveryNoteController,
        },
      ],
    }).compile();

    controller = module.get<DeliveryNoteController>(DeliveryNoteController);
    config = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be generate code Delivery Note', async () => {
    expect(
      await controller.GenerateCode({
        ...MessageSample,
        value: 'KPJ-01-01-00001-001',
      }),
    ).toEqual('DN-001-002');
  });

  it('should be create delivery note', async () => {
    expect(
      await controller.DeliveryNoteCreate({
        ...MessageSample,
        value: sampleDeliveryNoteControllerNew,
      }),
    ).toEqual({
      errors: null,
      status: 201,
      message: config.get<string>('messageBase.DeliveryNote.save.Success'),
    });
  });

  it('should be create delivery note failed', async () => {
    mockDeliveryNoteController.create.mockRejectedValue(new Error());

    try {
      await controller.DeliveryNoteCreate({
        ...MessageSample,
        value: sampleDeliveryNoteControllerNew,
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        message: config.get<string>('messageBase.DeliveryNote.save.Failed'),
      });
    }
  });

  it('should be getOne delivery note', async () => {
    expect(
      await controller.DeliveryNoteById({
        ...MessageSample,
        value: expect.any(String),
      }),
    ).toEqual({
      errors: null,
      status: 200,
      data: sampleDeliveryNote,
      message: config.get<string>('messageBase.DeliveryNote.One.Success'),
    });
  });

  it('should be getOne delivery note failed', async () => {
    mockDeliveryNoteController.findById.mockRejectedValue(new Error());

    try {
      await controller.DeliveryNoteById({
        ...MessageSample,
        value: expect.any(String),
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        data: null,
        message: config.get<string>('messageBase.DeliveryNote.One.Failed'),
      });
    }
  });
  it('should be get Paginate delivery note', async () => {
    mockDeliveryNoteController.aggregate.mockReturnValue([
      { data: [sampleDeliveryNote], metadata: [{ total: 1 }] },
    ]);

    expect(
      await controller.DeliveryNotePaginate({
        ...MessageSample,
        value: {
          keyId: expect.any(String),
          skip: 0,
          limit: 10,
        },
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
      data: [sampleDeliveryNote],
    });
  });

  it('should be get Paginate delivery failed', async () => {
    mockDeliveryNoteController.aggregate.mockReturnValue(false);

    expect(
      await controller.DeliveryNotePaginate({
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

  it('should be getAll delivery note failed', async () => {
    mockDeliveryNoteController.find.mockRejectedValue(new Error());

    try {
      await controller.DeliveryNoteList({
        ...MessageSample,
        value: expect.any(String),
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        data: null,
        message: config.get<string>('messageBase.DeliveryNote.All.Failed'),
      });
    }
  });

  it('should be update delivery note', async () => {
    expect(
      await controller.DeliveryNoteUpdate({
        ...MessageSample,
        value: {
          id: expect.any(String),
          awb: 'XXXXXXXX',
        },
      }),
    ).toEqual({
      errors: null,
      status: 200,
      data: sampleDeliveryNote,
      message: config.get<string>('messageBase.DeliveryNote.update.Success'),
    });
  });

  it('should be remove delivery note', async () => {
    expect(
      await controller.DeliveryNoteRemove({
        ...MessageSample,
        value: expect.any(String),
      }),
    ).toEqual({
      errors: null,
      status: 200,
      message: config.get<string>('messageBase.DeliveryNote.delete.Success'),
    });
  });

  it('should be update delivery note failed', async () => {
    mockDeliveryNoteController.findByIdAndUpdate.mockRejectedValue(new Error());

    try {
      await controller.DeliveryNoteUpdate({
        ...MessageSample,
        value: {
          id: expect.any(String),
          awb: 'XXXXXXXX',
        },
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        data: null,
        message: config.get<string>('messageBase.DeliveryNote.update.Failed'),
      });
    }
  });

  it('should be remove delivery note failed', async () => {
    mockDeliveryNoteController.findByIdAndUpdate.mockRejectedValue(new Error());

    try {
      await controller.DeliveryNoteRemove({
        ...MessageSample,
        value: expect.any(String),
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        message: config.get<string>('messageBase.DeliveryNote.delete.Failed'),
      });
    }
  });

  it('should be count document if = 0', async () => {
    mockDeliveryNoteController.find.mockReturnValue(0);
    expect(
      await controller.GenerateCode({
        ...MessageSample,
        value: 'KPJ-01-01-00001-001',
      }),
    ).toEqual('DN-001-001');
  });

  it('should be count document if > 0', async () => {
    mockDeliveryNoteController.find.mockReturnValue(1);
    expect(
      await controller.GenerateCode({
        ...MessageSample,
        value: 'KPJ-01-01-00001-001',
      }),
    ).toEqual('DN-001-001');
  });

  it('should be getAll delivery note', async () => {
    jest.spyOn(mockDeliveryNoteController, 'find').mockImplementation(() => ({
      sort: jest.fn(() => [sampleDeliveryNote]),
    }));
    expect(
      await controller.DeliveryNoteList({
        ...MessageSample,
        value: expect.any(String),
      }),
    ).toEqual({
      errors: null,
      status: 200,
      data: [sampleDeliveryNote],
      message: config.get<string>('messageBase.DeliveryNote.All.Success'),
    });
  });
});
