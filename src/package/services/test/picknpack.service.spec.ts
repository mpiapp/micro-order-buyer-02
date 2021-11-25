import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PicknPackService } from '../picknpack.service';
import { Order } from './../../../database/schema/orders.schema';

const mockPicknPack = {
  updateOne: jest.fn().mockImplementation(() => {
    return {
      message: 'Update Success',
      status: true,
      id: expect.any(String),
    };
  }),
};
describe('PicknPackService', () => {
  let service: PicknPackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PicknPackService,
        {
          provide: getModelToken(Order.name),
          useValue: mockPicknPack,
        },
      ],
    }).compile();

    service = module.get<PicknPackService>(PicknPackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be pick Package', async () => {
    expect(
      await service.pickPackage({
        id: expect.any(String),
        code: 'PICK-XXX-001',
        items: [],
        total: 10000,
        statuses: {
          name: 'PICK',
          timestamp: new Date('2021-10-21'),
        },
      }),
    ).toEqual({
      message: 'Update Success',
      status: true,
      id: expect.any(String),
    });
  });

  it('should be pack Package', async () => {
    expect(
      await service.packPackage({
        id: expect.any(String),
        code: 'PACK-XXX-001',
        items: [],
        total: 10000,
        statuses: {
          name: 'PICK',
          timestamp: new Date('2021-10-21'),
        },
      }),
    ).toEqual({
      message: 'Update Success',
      status: true,
      id: expect.any(String),
    });
  });
});
