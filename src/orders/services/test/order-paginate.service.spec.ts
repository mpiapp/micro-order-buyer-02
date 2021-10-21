import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PO } from './../../../purchase-order/schemas/purchase-order.schema';
import { samplePaginate } from './../../../../test/mocks/sample/Package/sample.paginate.mock';
import { OrderPaginateService } from '../order-paginate.service';

const mockOrderPaginate = {
  aggregate: jest.fn().mockReturnValue(samplePaginate),
};
describe('OrderPaginateService', () => {
  let service: OrderPaginateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderPaginateService,
        {
          provide: getModelToken(PO.name),
          useValue: mockOrderPaginate,
        },
      ],
    }).compile();

    service = module.get<OrderPaginateService>(OrderPaginateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get data order paginate', async () => {
    expect(
      await service.paginate({
        vendorId: expect.any(String),
        status: 'NEW',
        skip: 0,
        limit: 10,
      }),
    ).toEqual(samplePaginate);
  });
});
