import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Order } from './../../database/schema/orders.schema';
import { MessageSample } from './../../../test/mocks/sample/message/sample.message.mock';
import { DeliveryNoteStatusService } from './services/delivery-note-status.service';
import { OrdersStatusService } from './services/orders-status.service';
import { StatusController } from './status.controller';
import { mockStatusService } from './../../../test/mocks/services/Status.mocks';
import { sample_status } from './../../../test/mocks/sample/Status/sample.data.mocks';
import { DeliveryNote } from './../../database/schema/delivery-note.schema';

describe('StatusController', () => {
  let controller: StatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [
        DeliveryNoteStatusService,
        {
          provide: getModelToken(DeliveryNote.name),
          useValue: mockStatusService,
        },
        OrdersStatusService,
        {
          provide: getModelToken(Order.name),
          useValue: mockStatusService,
        },
      ],
    }).compile();

    controller = module.get<StatusController>(StatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be OrderStatusPush', async () => {
    expect(
      await controller.orderStatusPush({
        ...MessageSample,
        value: sample_status,
      }),
    ).toEqual(sample_status);
  });

  it('should be PackageStatusPush', async () => {
    expect(
      await controller.packageStatusPush({
        ...MessageSample,
        value: {
          ...sample_status,
          packageId: expect.any(String),
          vendorId: expect.any(String),
        },
      }),
    ).toEqual(sample_status);
  });

  it('should be VendorStatusPush', async () => {
    expect(
      await controller.vendorStatusPush({
        ...MessageSample,
        value: {
          ...sample_status,
          vendorId: expect.any(String),
        },
      }),
    ).toEqual(sample_status);
  });

  it('should be ItemStatusPush', async () => {
    expect(
      await controller.itemStatusPush({
        ...MessageSample,
        value: {
          ...sample_status,
          packageId: expect.any(String),
          vendorId: expect.any(String),
          itemsId: expect.any(String),
        },
      }),
    ).toEqual(sample_status);
  });

  it('should be DeliveryNoteStatusPush', async () => {
    expect(
      await controller.deliveryStatusPush({
        ...MessageSample,
        value: sample_status,
      }),
    ).toEqual(sample_status);
  });
});
