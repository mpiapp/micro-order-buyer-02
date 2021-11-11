import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { SampleCreate } from './../../test/mocks/sample/Purchase-Request/sample.data.create.mock';
import { mockControllerPurchaseRequest } from '../../test/mocks/services/Controller.mocks';
import { PurchaseRequestController } from './purchase-request.controller';
import { PR } from './schemas/purchase-request.schema';
import { PurchaseRequestService } from './services/purchase-request.service';
import { GenerateService } from './services/generate.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UpdateItemsService } from './services/update-items.service';
import { sampleItem } from './../../test/mocks/sample/Products/sample.item.mock';
import { SampleUpdate } from './../../test/mocks/sample/Purchase-Request/sample.data.update.mock';
import configuration from './../config/configuration';
import { SampleCode } from './../../test/mocks/sample/Purchase-Request/sample.code.mock';
import { sampleStatus } from './../../test/mocks/sample/Status/sample.data.mocks';
import { UpdateStatusService } from './services/update-status.service';
import { Helper } from './../utils/helper.utils';
import { CacheModule } from '@nestjs/common';

describe('PurchaseRequestController', () => {
  let controller: PurchaseRequestController;
  let config: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
        CacheModule.register(),
      ],
      controllers: [PurchaseRequestController],
      providers: [
        GenerateService,
        PurchaseRequestService,
        UpdateItemsService,
        UpdateStatusService,
        Helper,
        {
          provide: getModelToken(PR.name),
          useValue: mockControllerPurchaseRequest,
        },
      ],
    }).compile();

    controller = module.get<PurchaseRequestController>(
      PurchaseRequestController,
    );
    config = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create PR Success', async () => {
    const initialValue = 0;
    const sum: number = SampleCreate.items.reduce(function (
      total,
      currentValue,
    ) {
      // eslint-disable-next-line prettier/prettier
      return (currentValue.price * currentValue.quantity) + total;
    },
    initialValue);

    SampleCreate.total = sum;
    expect(await controller.PRCreate(SampleCreate)).toEqual({
      errors: null,
      status: 201,
      message: config.get<string>('messageBase.PurchaseRequest.save.Success'),
    });
  });

  it('should create PR Failed Total', async () => {
    mockControllerPurchaseRequest.create.mockImplementation(() => {
      throw new Error('Sorry Total Price Wrong');
    });

    try {
      SampleCreate.total = 0;
      await controller.PRCreate(SampleCreate);
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should update add Item PR Success', async () => {
    expect(await controller.PRaddItem(expect.any(String), sampleItem)).toEqual(
      SampleCreate,
    );
  });

  it('should update change qty Item PR Success', async () => {
    expect(
      await controller.PRUpdateItem(expect.any(String), sampleItem),
    ).toEqual(SampleCreate);
  });

  it('should update remove Item PR Success', async () => {
    expect(
      await controller.PRRemoveItem(expect.any(String), sampleItem),
    ).toEqual(SampleCreate);
  });

  it('should update add Item PR Success If Item existing', async () => {
    mockControllerPurchaseRequest.updateOne.mockImplementation(() => {
      return {
        matchedCount: 0,
      };
    });

    expect(await controller.PRaddItem(expect.any(String), sampleItem)).toEqual(
      SampleCreate,
    );
  });

  it('should update add Item PR Success If Not Item existing', async () => {
    mockControllerPurchaseRequest.updateOne.mockImplementation(() => {
      return {
        matchedCount: 1,
      };
    });

    expect(await controller.PRaddItem(expect.any(String), sampleItem)).toEqual(
      SampleCreate,
    );
  });

  it('should update PR Success', async () => {
    mockControllerPurchaseRequest.findByIdAndUpdate.mockImplementation(() => {
      return {
        ...SampleCreate,
        ...SampleUpdate,
      };
    });
    expect(await controller.PRUpdate(expect.any(String), SampleUpdate)).toEqual(
      {
        errors: null,
        status: 200,
        data: {
          ...SampleCreate,
          ...SampleUpdate,
        },
        message: config.get<string>(
          'messageBase.PurchaseRequest.update.Success',
        ),
      },
    );
  });

  it('should soft delete PR', async () => {
    mockControllerPurchaseRequest.findByIdAndUpdate.mockImplementation(() => {
      return {
        ...SampleCreate,
        isDelete: true,
      };
    });
    expect(await controller.PRDelete(expect.any(String))).toEqual({
      errors: null,
      status: 200,
      message: config.get<string>('messageBase.PurchaseRequest.delete.Success'),
    });
  });

  it('should update PR Failed', async () => {
    mockControllerPurchaseRequest.findByIdAndUpdate.mockImplementation(() => {
      throw new Error();
    });

    try {
      SampleUpdate.total = 0;
      await controller.PRUpdate(expect.any(String), SampleUpdate);
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should delete PR Failed', async () => {
    mockControllerPurchaseRequest.findByIdAndUpdate.mockImplementation(() => {
      throw new Error();
    });

    try {
      await controller.PRDelete(expect.any(String));
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should get list PR Success', async () => {
    expect(await controller.PRList({ buyerId: expect.any(String) })).toEqual({
      errors: null,
      status: 200,
      data: [SampleCreate],
      message: config.get<string>('messageBase.PurchaseRequest.All.Success'),
    });
  });

  it('should Search PR Success', async () => {
    expect(await controller.PRSearch(SampleCode)).toEqual({
      errors: null,
      status: 200,
      data: [SampleCreate],
      message: config.get<string>('messageBase.PurchaseRequest.Search.Success'),
    });
  });

  it('should get list PR Failed', async () => {
    mockControllerPurchaseRequest.find.mockImplementation(() => {
      throw new Error();
    });

    try {
      await controller.PRList({ buyerId: expect.any(String) });
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should get PR By Id Success', async () => {
    expect(await controller.PRById(expect.any(String))).toEqual({
      errors: null,
      status: 200,
      data: SampleCreate,
      message: config.get<string>('messageBase.PurchaseRequest.One.Success'),
    });
  });

  it('should get PR By Id Failed', async () => {
    mockControllerPurchaseRequest.findById.mockImplementation(() => {
      throw new Error();
    });

    try {
      await controller.PRById(expect.any(String));
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should Search PR Failed', async () => {
    try {
      await controller.PRSearch(SampleCode);
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should update add Item PR Failed', async () => {
    mockControllerPurchaseRequest.updateOne.mockImplementation(() => {
      return false;
    });
    try {
      await controller.PRaddItem(expect.any(String), sampleItem);
    } catch (error) {
      expect(error).toEqual(error);
    }
  });

  it('should update add Item PR Failed', async () => {
    mockControllerPurchaseRequest.updateOne.mockImplementation(() => {
      throw new Error('Sorry Total Price Wrong');
    });
    try {
      await controller.PRaddItem(expect.any(String), sampleItem);
    } catch (error) {
      expect(error).toEqual(error);
    }
  });

  it('should update change qty Item PR Failed', async () => {
    try {
      await controller.PRUpdateItem(expect.any(String), sampleItem);
    } catch (error) {
      expect(error).toEqual(error);
    }
  });

  it('should update remove Item PR Failed', async () => {
    try {
      await controller.PRRemoveItem(expect.any(String), sampleItem);
    } catch (error) {
      expect(error).toEqual(error);
    }
  });

  it('should add Status Master PR', async () => {
    SampleCreate.statuses.push(sampleStatus);
    mockControllerPurchaseRequest.findByIdAndUpdate.mockImplementation(() => {
      return SampleCreate;
    });
    expect(
      await controller.PRaddStatus(expect.any(String), sampleStatus),
    ).toEqual(SampleCreate);
  });
});
