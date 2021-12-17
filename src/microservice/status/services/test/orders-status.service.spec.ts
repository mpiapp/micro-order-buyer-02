import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Order } from './../../../../database/schema/orders.schema';
import { OrdersStatusService } from '../orders-status.service';
import { mockStatusService } from './../../../../../test/mocks/services/Status.mocks';
import { sample_status } from './../../../../../test/mocks/sample/Status/sample.data.mocks';

describe('OrdersStatusService', () => {
  let service: OrdersStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersStatusService,
        {
          provide: getModelToken(Order.name),
          useValue: mockStatusService,
        },
      ],
    }).compile();

    service = module.get<OrdersStatusService>(OrdersStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be push order level', async () => {
    expect(await service.pushStatusOrder(sample_status)).toEqual(sample_status);
  });

  it('should be push vendor level', async () => {
    expect(
      await service.pushStatusVendor({
        ...sample_status,
        vendorId: expect.any(String),
      }),
    ).toEqual(sample_status);
  });

  it('should be push package level', async () => {
    expect(
      await service.pushStatusPackage({
        ...sample_status,
        packageId: expect.any(String),
        vendorId: expect.any(String),
      }),
    ).toEqual(sample_status);
  });

  it('should be push item level', async () => {
    expect(
      await service.pushStatusItem({
        ...sample_status,
        packageId: expect.any(String),
        vendorId: expect.any(String),
        itemsId: expect.any(String),
      }),
    ).toEqual(sample_status);
  });
});
