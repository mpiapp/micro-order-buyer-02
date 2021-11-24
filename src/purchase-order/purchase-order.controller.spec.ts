import { ConfigModule, ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Helper } from './../utils/helper.utils';
import { sampleDataCreatePO } from './../../test/mocks/sample/Purchase-Order/sample.data.search.mock';
import { mockControllerPurchaseOrder } from './../../test/mocks/services/Controller.mocks';
import { PurchaseOrderController } from './purchase-order.controller';
import { PurchaseOrderService } from './services/purchase-order.service';
import { CacheModule } from '@nestjs/common';
import { Order } from './../database/schema/orders.schema';
import { MessageSample } from './../../test/mocks/sample/message/sample.message.mock';

describe('PurchaseOrderController', () => {
  let controller: PurchaseOrderController;
  let config: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), CacheModule.register()],
      controllers: [PurchaseOrderController],
      providers: [
        PurchaseOrderService,
        Helper,
        {
          provide: getModelToken(Order.name),
          useValue: mockControllerPurchaseOrder,
        },
      ],
    }).compile();

    controller = module.get<PurchaseOrderController>(PurchaseOrderController);
    config = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get list PO Success', async () => {
    expect(
      await controller.POList({ ...MessageSample, value: expect.any(String) }),
    ).toEqual({
      errors: null,
      status: 200,
      message: config.get<string>('messageBase.PurchaseOrder.All.Success'),
      data: [sampleDataCreatePO],
    });
  });

  it('should get PO By Id Success', async () => {
    expect(
      await controller.POById({ ...MessageSample, value: expect.any(String) }),
    ).toEqual({
      errors: null,
      status: 200,
      message: config.get<string>('messageBase.PurchaseOrder.One.Success'),
      data: sampleDataCreatePO,
    });
  });

  it('should Search PO Success', async () => {
    expect(
      await controller.POSearch({
        ...MessageSample,
        value: expect.any(String),
      }),
    ).toEqual({
      errors: null,
      status: 200,
      message: config.get<string>('messageBase.PurchaseOrder.Search.Success'),
      data: [sampleDataCreatePO],
    });
  });

  it('should be soft delete master PO', async () => {
    mockControllerPurchaseOrder.findByIdAndUpdate.mockImplementation(() => {
      return {
        ...sampleDataCreatePO,
        isDelete: true,
      };
    });

    expect(
      await controller.PODelete({
        ...MessageSample,
        value: expect.any(String),
      }),
    ).toEqual({
      errors: null,
      status: 200,
      message: config.get<string>('messageBase.PurchaseOrder.delete.Success'),
    });
  });

  it('should be paginate Purchase Order', async () => {
    mockControllerPurchaseOrder.aggregate.mockReturnValue([
      { data: [sampleDataCreatePO], metadata: [{ total: 1 }] },
    ]);

    expect(
      await controller.getPurchaseOrderPaginate({
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
      data: [sampleDataCreatePO],
    });
  });

  it('should be paginate Purchase Order Metadata Null', async () => {
    mockControllerPurchaseOrder.aggregate.mockReturnValue([
      { data: [sampleDataCreatePO], metadata: [] },
    ]);

    expect(
      await controller.getPurchaseOrderPaginate({
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
      data: [sampleDataCreatePO],
    });
  });

  it('should be paginate Purchase Order failed', async () => {
    mockControllerPurchaseOrder.aggregate.mockReturnValue(false);

    expect(
      await controller.getPurchaseOrderPaginate({
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

  it('should get list PO Failed', async () => {
    mockControllerPurchaseOrder.find.mockRejectedValue(Error());
    try {
      await controller.POList({
        ...MessageSample,
        value: expect.any(String),
      });
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should get PO By Id Failed', async () => {
    mockControllerPurchaseOrder.findById.mockRejectedValue(Error());
    try {
      await controller.POById({
        ...MessageSample,
        value: expect.any(String),
      });
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should Search PO Failed', async () => {
    try {
      await controller.POSearch({
        ...MessageSample,
        value: expect.any(String),
      });
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should Delete PO Failed', async () => {
    mockControllerPurchaseOrder.findByIdAndUpdate.mockRejectedValue(
      new Error('error'),
    );
    try {
      await controller.PODelete({
        ...MessageSample,
        value: expect.any(String),
      });
    } catch (error) {
      expect(error).toBe(error);
    }
  });
});
