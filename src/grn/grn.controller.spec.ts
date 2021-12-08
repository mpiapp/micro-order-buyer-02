import { ConfigModule, ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryNote } from './../database/schema/delivery-note.schema';
import { Helper } from './../utils/helper.utils';
import configuration from './../config/configuration';
import { GrnController } from './grn.controller';
import { GrnService } from './services/grn.service';
import { mockGrnController } from './../../test/mocks/services/Controller.mocks';
import { sampleGRN } from './../../test/mocks/sample/GoodReceiveNote/Sample.Data.mocks';
import { CacheModule } from '@nestjs/common';
import { MessageSample } from './../../test/mocks/sample/message/sample.message.mock';

describe('GrnController', () => {
  let controller: GrnController;
  let config: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
        CacheModule.register(),
      ],
      controllers: [GrnController],
      providers: [
        GrnService,
        Helper,
        {
          provide: getModelToken(DeliveryNote.name),
          useValue: mockGrnController,
        },
      ],
    }).compile();

    controller = module.get<GrnController>(GrnController);
    config = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be generate code GRN', async () => {
    expect(
      await controller.GenerateCode({
        ...MessageSample,
        value: 'KPJ-01-01-00001-001',
      }),
    ).toEqual('GRN-001-002');
  });

  it('should be getOne Good Receive note', async () => {
    expect(
      await controller.GRNGetById({
        ...MessageSample,
        value: expect.any(String),
      }),
    ).toEqual({
      errors: null,
      status: 200,
      data: sampleGRN,
      message: config.get<string>('messageBase.GRN.One.Success'),
    });
  });

  it('should be getOne Good Receive note failed', async () => {
    mockGrnController.findById.mockRejectedValue(new Error());

    try {
      await controller.GRNGetById({
        ...MessageSample,
        value: expect.any(String),
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        data: null,
        message: config.get<string>('messageBase.GRN.One.Failed'),
      });
    }
  });

  it('should be get Paginate Good Receive note', async () => {
    mockGrnController.aggregate.mockReturnValue([
      { data: [sampleGRN], metadata: [{ total: 1 }] },
    ]);

    expect(
      await controller.GRNPaginate({
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
      data: [sampleGRN],
      count: 1,
    });
  });

  it('should be get Paginate Good Receive note Metadata Null', async () => {
    mockGrnController.aggregate.mockReturnValue([
      { data: [sampleGRN], metadata: [] },
    ]);

    expect(
      await controller.GRNPaginate({
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
      data: [sampleGRN],
    });
  });

  it('should be get Paginate Good Receive failed', async () => {
    mockGrnController.aggregate.mockReturnValue(false);

    expect(
      await controller.GRNPaginate({
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

  it('should be getAll Good Receive note failed', async () => {
    mockGrnController.find.mockRejectedValue(new Error());

    try {
      await controller.GRNList({ ...MessageSample, value: expect.any(String) });
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        data: null,
        message: config.get<string>('messageBase.GRN.All.Failed'),
      });
    }
  });

  it('should be update Good Receive Note', async () => {
    expect(
      await controller.GRNUpdate({
        ...MessageSample,
        value: { id: expect.any(String), params: sampleGRN },
      }),
    ).toEqual({
      errors: null,
      status: 200,
      data: sampleGRN,
      message: config.get<string>('messageBase.GRN.save.Success'),
    });
  });

  it('should be Reject Good Receive note', async () => {
    expect(
      await controller.GRNRejected({
        ...MessageSample,
        value: {
          id: expect.any(String),
          params: {
            name: 'Rejected',
            timestamp: new Date(),
          },
        },
      }),
    ).toEqual({
      errors: null,
      status: 200,
      data: sampleGRN,
      message: config.get<string>('messageBase.GRN.reject.Success'),
    });
  });

  it('should be getAll Good Receive note failed', async () => {
    mockGrnController.findByIdAndUpdate.mockRejectedValue(new Error());

    try {
      await controller.GRNUpdate({
        ...MessageSample,
        value: { id: expect.any(String), params: sampleGRN },
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        data: null,
        message: config.get<string>('messageBase.GRN.save.Failed'),
      });
    }
  });

  it('should be Reject Good Receive note failed', async () => {
    mockGrnController.findByIdAndUpdate.mockRejectedValue(new Error());

    try {
      await controller.GRNRejected({
        ...MessageSample,
        value: {
          id: expect.any(String),
          params: {
            name: 'Rejected',
            timestamp: new Date(),
          },
        },
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        data: null,
        message: config.get<string>('messageBase.GRN.reject.Failed'),
      });
    }
  });

  it('should be generate code GRN if get count > 1', async () => {
    mockGrnController.find.mockResolvedValue(1);

    expect(
      await controller.GenerateCode({
        ...MessageSample,
        value: 'KPJ-01-01-00001-001',
      }),
    ).toEqual('GRN-001-001');
  });

  it('should be getAll Good Receive note', async () => {
    jest.spyOn(mockGrnController, 'find').mockImplementation(() => ({
      sort: jest.fn(() => [sampleGRN]),
    }));

    expect(
      await controller.GRNList({ ...MessageSample, value: expect.any(String) }),
    ).toEqual({
      errors: null,
      status: 200,
      data: [sampleGRN],
      message: config.get<string>('messageBase.GRN.All.Success'),
    });
  });
});
