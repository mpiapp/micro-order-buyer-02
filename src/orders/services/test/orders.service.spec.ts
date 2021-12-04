import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { sampleFullPackage } from './../../../../test/mocks/sample/Package/sample.full.data.mock';
import { OrdersService } from './../orders.service';
import { Order } from './../../../database/schema/orders.schema';

const mockOrders = {
  aggregate: jest.fn().mockReturnValue(sampleFullPackage),
};

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getModelToken(Order.name),
          useValue: mockOrders,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get PO Vendor', async () => {
    expect(await service.getOrders(expect.any(String))).toEqual(
      sampleFullPackage,
    );
  });

  it('should be getById PO', async () => {
    expect(await service.getOrderById(expect.any(String))).toEqual(
      sampleFullPackage,
    );
  });
});
