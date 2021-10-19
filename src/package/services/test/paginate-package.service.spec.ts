import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PO } from './../../../purchase-order/schemas/purchase-order.schema';
import { sampleFullPackage } from './../../../../test/mocks/sample/Package/sample.full.data.mock';
import { PaginatePackageService } from '../pagitane-package.service';

const mockPackage = {
  find: jest.fn().mockReturnValue(sampleFullPackage),
  updateOne: jest.fn().mockImplementation(() => {
    return {
      message: 'Update Success',
      status: true,
      id: expect.any(String),
    };
  }),
  aggregate: jest.fn().mockReturnValue(sampleFullPackage),
};
describe('PaginatePackageService', () => {
  let service: PaginatePackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaginatePackageService,
        {
          provide: getModelToken(PO.name),
          useValue: mockPackage,
        },
      ],
    }).compile();

    service = module.get<PaginatePackageService>(PaginatePackageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
