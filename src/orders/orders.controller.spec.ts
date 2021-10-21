import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Helper } from './../utils/helper.utils';
import configuration from './../config/configuration';
import { OrdersController } from './orders.controller';
import { OrderPaginateService } from './services/order-paginate.service';
import { OrdersService } from './services/orders.service';
import { getModelToken } from '@nestjs/mongoose';
import { PO } from './../purchase-order/schemas/purchase-order.schema';
import { sampleFullPackage } from './../../test/mocks/sample/Package/sample.full.data.mock';
import { GenerateCoderService } from './../purchase-order/services/purchase-order-generate-code.service';

const mockControllerOrders = {
  aggregate: jest.fn().mockReturnValue(sampleFullPackage),
};
describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      controllers: [OrdersController],
      providers: [
        GenerateCoderService,
        OrdersService,
        Helper,
        OrderPaginateService,
        {
          provide: getModelToken(PO.name),
          useValue: mockControllerOrders,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be getOrder', async () => {
    expect(await controller.getOrder(expect.any(String), 'NEW')).toEqual({
      errors: null,
      status: 200,
      message: 'Get Orders Success',
      data: sampleFullPackage,
    });
  });

  it('should be getOrder By Id', async () => {
    expect(await controller.getOrderById(expect.any(String))).toEqual({
      errors: null,
      status: 200,
      message: 'Get Order Success',
      data: sampleFullPackage,
    });
  });

  it('should be get Id Package', async () => {
    expect(
      await controller.getIdPackage({ id: expect.any(String), count: 4 }),
    ).toEqual('KPJ-12-10-00001-001-004');
  });

  it('should be getOrder By Id failed', async () => {
    mockControllerOrders.aggregate.mockRejectedValue(new Error());

    try {
      await controller.getOrderById(expect.any(String));
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: 'Get Order Failed',
      });
    }
  });

  it('should be getOrder failed', async () => {
    try {
      await controller.getOrder(expect.any(String), 'NEW');
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: 'Get Orders Failed',
      });
    }
  });

  it('should be getOrderPaginate', async () => {
    mockControllerOrders.aggregate.mockReturnValue([
      { data: [sampleFullPackage], metadata: [{ total: 1 }] },
    ]);

    expect(
      await controller.getOrderPaginate({
        vendorId: expect.any(String),
        status: 'NEW',
        skip: 0,
        limit: 10,
      }),
    ).toEqual({
      count: 1,
      page: 0,
      limit: 10,
      data: [sampleFullPackage],
    });
  });

  it('should be getOrderPaginate Metadata Null', async () => {
    mockControllerOrders.aggregate.mockReturnValue([
      { data: [sampleFullPackage], metadata: [] },
    ]);

    expect(
      await controller.getOrderPaginate({
        vendorId: expect.any(String),
        status: 'NEW',
        skip: 0,
        limit: 10,
      }),
    ).toEqual({
      count: 0,
      page: 0,
      limit: 10,
      data: [sampleFullPackage],
    });
  });

  it('should be getOrderPaginate failed', async () => {
    mockControllerOrders.aggregate.mockReturnValue(false);

    expect(
      await controller.getOrderPaginate({
        vendorId: expect.any(String),
        status: 'NEW',
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

  it('should be get Id Package IF > count', async () => {
    mockControllerOrders.aggregate.mockImplementation(() => {
      return {
        code_po: 'KPJ-12-10-00001-001',
        packages: [
          {
            no: 1,
          },
          {
            no: 2,
          },
        ],
      };
    });

    expect(
      await controller.getIdPackage({ id: expect.any(String), count: 4 }),
    ).toEqual('KPJ-12-10-00001-001-002');
  });
});
