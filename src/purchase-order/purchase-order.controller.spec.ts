import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Helper } from './../utils/helper.utils';
import { sampleDataCreatePO } from './../../test/mocks/sample/Purchase-Order/sample.data.search.mock';
import { mockControllerPurchaseOrder } from './../../test/mocks/services/Controller.mocks';
import { PurchaseOrderController } from './purchase-order.controller';
import { PO } from './schemas/purchase-order.schema';
import { GenerateCoderService } from './services/purchase-order-generate-code.service';
import { PurchaseOrderService } from './services/purchase-order.service';
import { sampleDataCreatePR } from './../../test/mocks/sample/Purchase-Order/sample.data.pr.mock';

describe('PurchaseOrderController', () => {
  let controller: PurchaseOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [PurchaseOrderController],
      providers: [
        PurchaseOrderService,
        GenerateCoderService,
        Helper,
        {
          provide: getModelToken(PO.name),
          useValue: mockControllerPurchaseOrder,
        },
      ],
    }).compile();

    controller = module.get<PurchaseOrderController>(PurchaseOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create PO', async () => {
    expect(await controller.POCreate(sampleDataCreatePR)).toEqual(
      sampleDataCreatePO,
    );
  });

  it('should get list PO Success', async () => {
    expect(await controller.POList(expect.any(String))).toEqual([
      sampleDataCreatePO,
    ]);
  });

  it('should get list PO Failed', async () => {
    try {
      await controller.POList(expect.any(String));
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should get PO By Id Success', async () => {
    expect(await controller.POById(expect.any(String))).toEqual(
      sampleDataCreatePO,
    );
  });

  it('should get PO By Id Failed', async () => {
    try {
      await controller.POById(expect.any(String));
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should Search PO Success', async () => {
    expect(await controller.POSearch(expect.any(String))).toEqual([
      sampleDataCreatePO,
    ]);
  });

  it('should Search PO Failed', async () => {
    try {
      await controller.POSearch(expect.any(String));
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should be soft delete master PO', async () => {
    mockControllerPurchaseOrder.findByIdAndUpdate.mockImplementation(() => {
      return {
        ...sampleDataCreatePO,
        isDelete: true,
      };
    });

    expect(await controller.PODelete(expect.any(String))).toEqual({
      ...sampleDataCreatePO,
      isDelete: true,
    });
  });
});
