import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  SampleCreate,
  SampleCreateService,
} from './../../../../test/mocks/sample/Purchase-Request/sample.data.create.mock';
import { mockControllerPurchaseRequest } from './../../../../test/mocks/services/Controller.mocks';
import { PurchaseRequestController } from './purchase-request.controller';
import { Order } from './../../../database/schema/orders.schema';
import { PurchaseRequestService } from './services/purchase-request.service';
import { GenerateService } from './services/generate.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SampleUpdate } from './../../../../test/mocks/sample/Purchase-Request/sample.data.update.mock';
import configuration from './../../../config/configuration';
import { Helper } from './../../../utils/helper.utils';
import { CacheModule } from '@nestjs/common';
import { MessageSample } from './../../../../test/mocks/sample/message/sample.message.mock';

describe('PurchaseRequestController', () => {
  let controller: PurchaseRequestController;
  let config: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
        CacheModule.register(),
      ],
      controllers: [PurchaseRequestController],
      providers: [
        GenerateService,
        PurchaseRequestService,
        Helper,
        {
          provide: getModelToken(Order.name),
          useValue: mockControllerPurchaseRequest,
        },
      ],
    }).compile();

    controller = module.get<PurchaseRequestController>(
      PurchaseRequestController,
    );
    config = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create PR Success', async () => {
    expect(
      await controller.create({ ...MessageSample, value: SampleCreate }),
    ).toEqual({
      errors: null,
      status: 201,
      message: config.get<string>('messageBase.PurchaseRequest.save.Success'),
      data: { ...SampleCreateService, code_pr: 'KPJ-12-10' },
    });
  });

  it('should update PR Success', async () => {
    mockControllerPurchaseRequest.findByIdAndUpdate.mockImplementation(() => {
      return {
        ...SampleCreate,
        ...SampleUpdate,
      };
    });
    expect(
      await controller.update({ ...MessageSample, value: SampleUpdate }),
    ).toEqual({
      errors: null,
      status: 200,
      data: {
        ...SampleCreate,
        ...SampleUpdate,
      },
      message: config.get<string>('messageBase.PurchaseRequest.update.Success'),
    });
  });

  it('should soft delete PR', async () => {
    mockControllerPurchaseRequest.findByIdAndUpdate.mockImplementation(() => {
      return {
        ...SampleCreate,
        isDelete: true,
      };
    });
    expect(
      await controller.delete({
        ...MessageSample,
        value: expect.any(String),
      }),
    ).toEqual({
      errors: null,
      status: 200,
      message: config.get<string>('messageBase.PurchaseRequest.delete.Success'),
    });
  });

  it('should update PR Failed', async () => {
    mockControllerPurchaseRequest.findByIdAndUpdate.mockImplementation(() => {
      throw new Error();
    });

    try {
      SampleUpdate.total = 0;
      await controller.update({ ...MessageSample, value: SampleUpdate });
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should delete PR Failed', async () => {
    mockControllerPurchaseRequest.findByIdAndUpdate.mockImplementation(() => {
      throw new Error();
    });

    try {
      await controller.delete({
        ...MessageSample,
        value: expect.any(String),
      });
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should get list PR Success', async () => {
    expect(
      await controller.getAll({ ...MessageSample, value: expect.any(String) }),
    ).toEqual({
      errors: null,
      status: 200,
      data: [SampleCreate],
      message: config.get<string>('messageBase.PurchaseRequest.All.Success'),
    });
  });

  it('should Search PR Success', async () => {
    expect(
      await controller.search({
        ...MessageSample,
        value: expect.any(String),
      }),
    ).toEqual({
      errors: null,
      status: 200,
      data: [SampleCreate],
      message: config.get<string>('messageBase.PurchaseRequest.Search.Success'),
    });
  });

  it('should get list PR Failed', async () => {
    mockControllerPurchaseRequest.aggregate.mockImplementation(() => {
      throw new Error();
    });

    try {
      await controller.getAll({ ...MessageSample, value: expect.any(String) });
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should get PR By Id Success', async () => {
    expect(
      await controller.getById({ ...MessageSample, value: expect.any(String) }),
    ).toEqual({
      errors: null,
      status: 200,
      data: SampleCreate,
      message: config.get<string>('messageBase.PurchaseRequest.One.Success'),
    });
  });

  it('should get PR By Id Failed', async () => {
    mockControllerPurchaseRequest.findById.mockImplementation(() => {
      throw new Error();
    });

    try {
      await controller.getById({ ...MessageSample, value: expect.any(String) });
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should Search PR Failed', async () => {
    mockControllerPurchaseRequest.find.mockImplementation(() => {
      throw new Error();
    });
    try {
      await controller.search({
        ...MessageSample,
        value: expect.any(String),
      });
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should be paginate Purchase Order', async () => {
    mockControllerPurchaseRequest.aggregate.mockReturnValue([
      { data: [SampleCreate], metadata: [{ total: 1 }] },
    ]);

    expect(
      await controller.paginate({
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
      data: [SampleCreate],
    });
  });

  it('should be paginate Purchase Order Metadata Null', async () => {
    mockControllerPurchaseRequest.aggregate.mockReturnValue([
      { data: [SampleCreate], metadata: [] },
    ]);

    expect(
      await controller.paginate({
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
      data: [SampleCreate],
    });
  });

  it('should be paginate Purchase Order failed', async () => {
    mockControllerPurchaseRequest.aggregate.mockReturnValue(false);

    expect(
      await controller.paginate({
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

  it('should be get items', async () => {
    mockControllerPurchaseRequest.aggregate.mockReturnValue([SampleCreate]);

    expect(
      await controller.getItems({
        ...MessageSample,
        value: expect.any(String),
      }),
    ).toEqual({
      errors: null,
      status: 200,
      data: [SampleCreate],
      message: config.get<string>('messageBase.PurchaseRequest.All.Success'),
    });
  });

  it('should be get items failed', async () => {
    mockControllerPurchaseRequest.aggregate.mockRejectedValue(false);

    try {
      await controller.getItems({
        ...MessageSample,
        value: expect.any(String),
      });
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should create PR generate null Success', async () => {
    mockControllerPurchaseRequest.find.mockReturnValue(null);

    expect(
      await controller.create({ ...MessageSample, value: SampleCreate }),
    ).toEqual({
      errors: null,
      status: 201,
      message: config.get<string>('messageBase.PurchaseRequest.save.Success'),
      data: { ...SampleCreateService, code_pr: 'KPJ-12-10' },
    });
  });

  it('should create PR Failed', async () => {
    mockControllerPurchaseRequest.create.mockRejectedValue('testing');

    try {
      await controller.create({ ...MessageSample, value: SampleCreate });
    } catch (error) {
      expect(error).toEqual('aasdad');
    }
  });

  it('should create PR Failed Total', async () => {
    mockControllerPurchaseRequest.create.mockImplementation(() => {
      throw new Error('Sorry Total Price Wrong');
    });

    try {
      SampleCreate.total = 0;
      await controller.create({ ...MessageSample, value: SampleCreate });
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should add Approval Master PR', async () => {
    mockControllerPurchaseRequest.findById.mockImplementation(() => {
      return SampleCreateService;
    });

    mockControllerPurchaseRequest.findByIdAndUpdate.mockImplementation(() => {
      return SampleCreateService;
    });

    expect(
      await controller.PRApproval({
        ...MessageSample,
        value: {
          id: expect.any(String),
          name: expect.any(String),
          note: expect.any(String),
          timestamp: new Date(),
        },
      }),
    ).toEqual(SampleCreateService);
  });
});
