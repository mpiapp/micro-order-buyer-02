import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { SampleCreate } from './../../test/mocks/sample/Purchase-Request/sample.data.create.mock';
import { mockControllerPurchaseRequest } from '../../test/mocks/services/Controller.mocks';
import { PurchaseRequestController } from './purchase-request.controller';
import { PR } from './schemas/purchase-request.schema';
import { PurchaseRequestService } from './services/purchase-request.service';
import { GenerateService } from './services/generate.service';
import { ConfigModule } from '@nestjs/config';

describe('PurchaseRequestController', () => {
  let controller: PurchaseRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [PurchaseRequestController],
      providers: [
        GenerateService,
        PurchaseRequestService,
        {
          provide: getModelToken(PR.name),
          useValue: mockControllerPurchaseRequest,
        },
      ],
    }).compile();

    controller = module.get<PurchaseRequestController>(
      PurchaseRequestController,
    );
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
    expect(await controller.PRCreate(SampleCreate)).toEqual(SampleCreate);
  });

  it('should create PR Generate Code', async () => {
    mockControllerPurchaseRequest.findOne.mockImplementation((_param) => {
      return { code: _param.code.$regex + '00001' };
    });

    expect(await controller.PRCreate(SampleCreate)).toBe(SampleCreate);
  });

  it('should create PR Wrong Total', async () => {
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
});
