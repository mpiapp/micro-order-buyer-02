import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { GenerateCoderService } from './../purchase-order/services/purchase-order-generate-code.service';
import { sampleAfterSplitPackage } from './../../test/mocks/sample/Package/sample.after.split.mock';
import { PackageController } from './package.controller';
import { PackageService } from './services/package.service';
import { Helper } from './../utils/helper.utils';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './../config/configuration';
import { sampleFullPackage } from './../../test/mocks/sample/Package/sample.full.data.mock';
import { sampleMoveItem } from './../../test/mocks/sample/Package/sample.move.item.mock';
import { PaginatePackageService } from './services/paginate-package.service';
import { PickPackService } from './services/pickPack.service';
import { samplePickPackPackage } from './../../test/mocks/sample/Package/sample.pick.mock';
import { Order } from './../database/schema/orders.schema';
import { ProofPaymentService } from './services/proof.payment.package.service';
import { MessageSample } from './../../test/mocks/sample/message/sample.message.mock';

const mockControllerPackage = {
  find: jest.fn().mockReturnValue(sampleAfterSplitPackage),
  aggregate: jest.fn().mockReturnValue(sampleFullPackage),
  updateOne: jest.fn().mockReturnValue(true),
};
describe('PackageController', () => {
  let controller: PackageController;
  let config: ConfigService;

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
        PickPackService,
        ProofPaymentService,
        {
          provide: getModelToken(Order.name),
          useValue: mockControllerPackage,
        },
      ],
    }).compile();

    controller = module.get<PackageController>(PackageController);
    config = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create pick', async () => {
    mockControllerPackage.find.mockReturnValue(false);
    expect(
      await controller.pickPackage({
        ...MessageSample,
        value: samplePickPackPackage,
      }),
    ).toEqual({
      errors: null,
      status: 201,
      message: config.get<string>('messageBase.Package.pick.Success'),
    });
  });

  it('should be proof of down payment', async () => {
    expect(
      await controller.proofPackage({
        ...MessageSample,
        value: {
          id: expect.any(String),
          fileUrl: expect.any(String),
          uploader: expect.any(String),
        },
      }),
    ).toEqual({
      errors: null,
      status: 200,
      message: config.get<string>('messageBase.Package.upload.Success'),
    });
  });

  it('should be approval of down payment', async () => {
    expect(
      await controller.approvalPackage({
        ...MessageSample,
        value: {
          id: expect.any(String),
          name: expect.any(String),
          nominal: expect.any(Number),
        },
      }),
    ).toEqual({
      errors: null,
      status: 200,
      message: config.get<string>('messageBase.Package.approval.Success'),
    });
  });

  it('should be create pack', async () => {
    expect(
      await controller.packPackage({
        ...MessageSample,
        value: samplePickPackPackage,
      }),
    ).toEqual({
      errors: null,
      status: 201,
      message: config.get<string>('messageBase.Package.pack.Success'),
    });
  });

  it('should be update package', async () => {
    expect(
      await controller.updatePackage({
        ...MessageSample,
        value: sampleMoveItem,
      }),
    ).toEqual({
      errors: null,
      status: 200,
      message: config.get<string>('messageBase.Package.update.Success'),
    });
  });

  it('should be getOrder', async () => {
    expect(
      await controller.getPackages({
        ...MessageSample,
        value: { id: expect.any(String), status: 'NEW' },
      }),
    ).toEqual({
      errors: null,
      status: 200,
      message: config.get<string>('messageBase.Package.All.Success'),
      data: sampleFullPackage,
    });
  });

  it('should be getOrder By Id', async () => {
    expect(
      await controller.getPackageById({
        ...MessageSample,
        value: expect.any(String),
      }),
    ).toEqual({
      errors: null,
      status: 200,
      message: config.get<string>('messageBase.Package.One.Success'),
      data: sampleFullPackage,
    });
  });

  it('should be getOrder By Id failed', async () => {
    mockControllerPackage.aggregate.mockRejectedValue(new Error());

    try {
      await controller.getPackageById({
        ...MessageSample,
        value: expect.any(String),
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: config.get<string>('messageBase.Package.One.Failed'),
      });
    }
  });

  it('should be getOrder failed', async () => {
    try {
      await controller.getPackages({
        ...MessageSample,
        value: { id: expect.any(String), status: 'NEW' },
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: config.get<string>('messageBase.Package.All.Failed'),
      });
    }
  });

  it('should be update package Failed', async () => {
    mockControllerPackage.updateOne.mockRejectedValue(new Error());
    try {
      await controller.updatePackage({
        ...MessageSample,
        value: sampleMoveItem,
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: config.get<string>('messageBase.Package.update.Failed'),
      });
    }
  });

  it('should be create pick failed', async () => {
    try {
      await controller.pickPackage({
        ...MessageSample,
        value: samplePickPackPackage,
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: config.get<string>('messageBase.Package.pick.Failed'),
      });
    }
  });

  it('should be create pack failed', async () => {
    try {
      await controller.packPackage({
        ...MessageSample,
        value: samplePickPackPackage,
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: config.get<string>('messageBase.Package.pack.Failed'),
      });
    }
  });

  it('should be proof of down payment failed', async () => {
    try {
      await controller.proofPackage({
        ...MessageSample,
        value: {
          id: expect.any(String),
          fileUrl: expect.any(String),
          uploader: expect.any(String),
        },
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: config.get<string>('messageBase.Package.pick.Failed'),
      });
    }
  });

  it('should be approval of down payment failed', async () => {
    try {
      await controller.approvalPackage({
        ...MessageSample,
        value: {
          id: expect.any(String),
          name: expect.any(String),
          nominal: expect.any(Number),
        },
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error.errors,
        status: 400,
        message: config.get<string>('messageBase.Package.pack.Failed'),
      });
    }
  });

  it('should be getPackagePaginate', async () => {
    mockControllerPackage.aggregate.mockReturnValue([
      { data: [sampleFullPackage], metadata: [{ total: 1 }] },
    ]);

    expect(
      await controller.getPackagePaginate({
        ...MessageSample,
        value: {
          vendorId: expect.any(String),
          status: 'NEW',
          skip: 0,
          limit: 10,
        },
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
        ...MessageSample,
        value: {
          vendorId: expect.any(String),
          status: 'NEW',
          skip: 0,
          limit: 10,
        },
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
        ...MessageSample,
        value: {
          vendorId: expect.any(String),
          status: 'NEW',
          skip: 0,
          limit: 10,
        },
      }),
    ).toEqual({
      count: 0,
      page: 0,
      limit: 10,
      data: null,
    });
  });

  it('should be create pick freez', async () => {
    mockControllerPackage.find.mockReturnValue(true);
    expect(
      await controller.pickPackage({
        ...MessageSample,
        value: samplePickPackPackage,
      }),
    ).toEqual({
      errors: true,
      status: 406,
      message: config.get<string>('messageBase.Package.check.Success'),
    });
  });
});
