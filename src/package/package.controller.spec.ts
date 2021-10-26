import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PO } from './../purchase-order/schemas/purchase-order.schema';
import { GenerateCoderService } from './../purchase-order/services/purchase-order-generate-code.service';
import { sampleAfterSplitPackage } from './../../test/mocks/sample/Package/sample.after.split.mock';
import { PackageController } from './package.controller';
import { PackageService } from './services/package.service';
import { Helper } from './../utils/helper.utils';
import { ConfigModule } from '@nestjs/config';
import configuration from './../config/configuration';
import { sampleFullPackage } from './../../test/mocks/sample/Package/sample.full.data.mock';
import { splitPackageSample } from './../../test/mocks/sample/Package/sample.full.split.mock';
import { sampleMoveItem } from './../../test/mocks/sample/Package/sample.move.item.mock';
import { PaginatePackageService } from './services/paginate-package.service';
import { PicknPackService } from './services/picknpack.service';
import { samplePicknPackPackage } from './../../test/mocks/sample/Package/sample.pick.mock';

const mockControllerPackage = {
  find: jest.fn().mockReturnValue(sampleAfterSplitPackage),
  aggregate: jest.fn().mockReturnValue(sampleFullPackage),
  updateOne: jest.fn().mockReturnValue(true),
};
describe('PackageController', () => {
  let controller: PackageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      controllers: [PackageController],
      providers: [
        GenerateCoderService,
        PackageService,
        Helper,
        PaginatePackageService,
        PicknPackService,
        {
          provide: getModelToken(PO.name),
          useValue: mockControllerPackage,
        },
      ],
    }).compile();

    controller = module.get<PackageController>(PackageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be split package', async () => {
    expect(
      await controller.splitPackage(expect.any(String), splitPackageSample),
    ).toEqual({
      errors: null,
      status: 201,
      message: 'Save Package Success',
    });
  });

  it('should be create pick', async () => {
    expect(
      await controller.pickPackage(expect.any(String), samplePicknPackPackage),
    ).toEqual({
      errors: null,
      status: 201,
      message: 'Save Pick Package Success',
    });
  });

  it('should be create pack', async () => {
    expect(
      await controller.packPackage(expect.any(String), samplePicknPackPackage),
    ).toEqual({
      errors: null,
      status: 201,
      message: 'Save Pack Package Success',
    });
  });

  it('should be update package', async () => {
    expect(
      await controller.updatePackage(expect.any(String), sampleMoveItem),
    ).toEqual({
      errors: null,
      status: 200,
      message: 'Update Package Success',
    });
  });

  it('should be split package failed', async () => {
    mockControllerPackage.updateOne.mockRejectedValue(new Error());

    try {
      await controller.splitPackage(expect.any(String), splitPackageSample);
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: 'Save Package Failed',
      });
    }
  });

  it('should be getOrder', async () => {
    expect(await controller.getPackages(expect.any(String), 'NEW')).toEqual({
      errors: null,
      status: 200,
      message: 'Get All Order Success',
      data: sampleFullPackage,
    });
  });

  it('should be getOrder By Id', async () => {
    expect(await controller.getPackageById(expect.any(String))).toEqual({
      errors: null,
      status: 200,
      message: 'Get One Order Success',
      data: sampleFullPackage,
    });
  });

  it('should be getOrder By Id failed', async () => {
    mockControllerPackage.aggregate.mockRejectedValue(new Error());

    try {
      await controller.getPackageById(expect.any(String));
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: 'Get One Order Failed',
      });
    }
  });

  it('should be getOrder failed', async () => {
    try {
      await controller.getPackages(expect.any(String), 'NEW');
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: 'Get All Order Failed',
      });
    }
  });

  it('should be update package Failed', async () => {
    try {
      await controller.updatePackage(expect.any(String), sampleMoveItem);
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: 'Update Package Failed',
      });
    }
  });

  it('should be create pick failed', async () => {
    try {
      await controller.pickPackage(expect.any(String), samplePicknPackPackage);
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: 'Update Pick Package Failed',
      });
    }
  });

  it('should be create pack failed', async () => {
    try {
      await controller.packPackage(expect.any(String), samplePicknPackPackage);
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: 'Update Pack Package Failed',
      });
    }
  });

  it('should be getPackagePaginate', async () => {
    mockControllerPackage.aggregate.mockReturnValue([
      { data: [sampleFullPackage], metadata: [{ total: 1 }] },
    ]);

    expect(
      await controller.getPackagePaginate({
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

  it('should be getPackagePaginate Metadata Null', async () => {
    mockControllerPackage.aggregate.mockReturnValue([
      { data: [sampleFullPackage], metadata: [] },
    ]);

    expect(
      await controller.getPackagePaginate({
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

  it('should be getPackagePaginate failed', async () => {
    mockControllerPackage.aggregate.mockReturnValue(false);

    expect(
      await controller.getPackagePaginate({
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
});
