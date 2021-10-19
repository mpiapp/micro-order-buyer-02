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
      await controller.splitPackage(
        expect.any(String),
        expect.any(String),
        splitPackageSample,
      ),
    ).toEqual({
      errors: null,
      status: 201,
      message: 'Save Package Success',
    });
  });

  it('should be split package failed', async () => {
    mockControllerPackage.updateOne.mockImplementation(() => {
      throw new Error();
    });

    try {
      await controller.splitPackage(
        expect.any(String),
        expect.any(String),
        splitPackageSample,
      );
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: 'Save Package Failed',
      });
    }
  });

  it('should be getOrder', async () => {
    expect(await controller.getOrder(expect.any(String), 'NEW')).toEqual({
      errors: null,
      status: 200,
      message: 'Get All Order Success',
      data: sampleFullPackage,
    });
  });

  it('should be get Id Package', async () => {
    expect(
      await controller.getIdPackage({ id: expect.any(String), count: 4 }),
    ).toEqual('KPJ-12-10-00001-001-004');
  });

  it('should be getOrder By Id', async () => {
    expect(await controller.getOrderById(expect.any(String))).toEqual({
      errors: null,
      status: 200,
      message: 'Get One Order Success',
      data: sampleFullPackage,
    });
  });

  it('should be getOrder By Id failed', async () => {
    mockControllerPackage.aggregate.mockImplementation(() => {
      throw new Error();
    });

    try {
      await controller.getOrderById(expect.any(String));
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: 'Get One Order Failed',
      });
    }
  });

  it('should be getOrder failed', async () => {
    mockControllerPackage.aggregate.mockImplementation(() => {
      throw new Error();
    });

    try {
      await controller.getOrder(expect.any(String), 'NEW');
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: 'Get All Order Failed',
      });
    }
  });

  it('should be get Id Package IF > count', async () => {
    mockControllerPackage.aggregate.mockImplementation(() => {
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
