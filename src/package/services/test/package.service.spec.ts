import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PO } from './../../../purchase-order/schemas/purchase-order.schema';
import { sampleFullPackage } from './../../../../test/mocks/sample/Package/sample.full.data.mock';
import { PackageService } from '../package.service';
import { splitPackageSample } from './../../../../test/mocks/sample/Package/sample.full.split.mock';

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
describe('PackageService', () => {
  let service: PackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PackageService,
        {
          provide: getModelToken(PO.name),
          useValue: mockPackage,
        },
      ],
    }).compile();

    service = module.get<PackageService>(PackageService);
  });

  it('should be defined ', () => {
    expect(service).toBeDefined();
  });

  it('should be get PO Vendor', async () => {
    expect(await service.getPackages(expect.any(String), 'NEW')).toEqual(
      sampleFullPackage,
    );
  });

  it('should be getById PO', async () => {
    expect(await service.getPackageById(expect.any(String))).toEqual(
      sampleFullPackage,
    );
  });

  it('should be split Package', async () => {
    expect(
      await service.splitPackage(
        expect.any(String),
        expect.any(String),
        splitPackageSample,
      ),
    ).toEqual({
      message: 'Update Success',
      status: true,
      id: expect.any(String),
    });
  });

  it('should be push Package', async () => {
    expect(
      await service.pushPackage(
        expect.any(String),
        expect.any(String),
        splitPackageSample,
      ),
    ).toEqual({
      message: 'Update Success',
      status: true,
      id: expect.any(String),
    });
  });

  it('should be pull Package', async () => {
    expect(
      await service.pullPackage(
        expect.any(String),
        expect.any(String),
        expect.any(String),
      ),
    ).toEqual({
      message: 'Update Success',
      status: true,
      id: expect.any(String),
    });
  });
});
