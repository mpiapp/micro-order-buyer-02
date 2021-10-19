import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PO } from './../../../purchase-order/schemas/purchase-order.schema';
import { PaginatePackageService } from '../paginate-package.service';
import { samplePaginate } from './../../../../test/mocks/sample/Package/sample.paginate.mock';

const mockPackagePaginate = {
  aggregate: jest.fn().mockReturnValue(samplePaginate),
};
describe('PaginatePackageService', () => {
  let service: PaginatePackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaginatePackageService,
        {
          provide: getModelToken(PO.name),
          useValue: mockPackagePaginate,
        },
      ],
    }).compile();

    service = module.get<PaginatePackageService>(PaginatePackageService);
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
