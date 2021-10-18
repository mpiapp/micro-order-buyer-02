import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PO } from './../purchase-order/schemas/purchase-order.schema';
import { GenerateCoderService } from './../purchase-order/services/purchase-order-generate-code.service';
import { sampleAfterSplitPackage } from './../../test/mocks/sample/Package/sample.after.split.mock';
import { sampleSplit } from './../../test/mocks/sample/Package/sample.split.item.data.mock';
import { PackageController } from './package.controller';
import { PackageService } from './services/package.service';
import { Helper } from './../utils/helper.utils';
import { ConfigModule } from '@nestjs/config';
import configuration from './../config/configuration';
import { sampleFullPackage } from './../../test/mocks/sample/Package/sample.full.data.mock';

const mockControllerPackage = {
  find: jest.fn().mockReturnValue(sampleAfterSplitPackage),
  aggregate: jest.fn().mockReturnValue(sampleFullPackage),
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

  // it('should be split package', async () => {
  //   expect(await controller.splitPackage(expect.any(String), expect.any(String), sampleSplit).toEqual(sampleAfterSplitPackage)
  // });

  it('should be getOrder', async () => {
    expect(await controller.getOrder(expect.any(String), 'NEW')).toEqual(
      sampleAfterSplitPackage,
    );
  });

  it('should be getOrder By Id', async () => {
    expect(await controller.getOrderById(expect.any(String))).toEqual(
      sampleFullPackage,
    );
  });
});
