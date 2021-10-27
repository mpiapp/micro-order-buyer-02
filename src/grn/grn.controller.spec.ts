import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DN } from './../delivery-note/schemas/delivery-note.schema';
import { GenerateCoderService } from './../purchase-order/services/purchase-order-generate-code.service';
import { Helper } from './../utils/helper.utils';
import configuration from './../config/configuration';
import { GrnController } from './grn.controller';
import { GrnService } from './services/grn.service';
import { mockGrnController } from './../../test/mocks/services/Controller.mocks';
import { sampleGRN } from './../../test/mocks/sample/GoodReceiveNote/Sample.Data.mocks';

describe('GrnController', () => {
  let controller: GrnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      controllers: [GrnController],
      providers: [
        GrnService,
        GenerateCoderService,
        Helper,
        {
          provide: getModelToken(DN.name),
          useValue: mockGrnController,
        },
      ],
    }).compile();

    controller = module.get<GrnController>(GrnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be generate code GRN', async () => {
    expect(await controller.GenerateCode('KPJ-01-01-00001-001')).toEqual(
      'GRN-001-002',
    );
  });

  it('should be getOne Good Receive note', async () => {
    expect(await controller.GRNGetById(expect.any(String))).toEqual({
      errors: null,
      status: 200,
      data: sampleGRN,
      message: 'Get One Good Receive Note Success',
    });
  });

  it('should be getOne Good Receive note failed', async () => {
    mockGrnController.findById.mockRejectedValue(new Error());

    try {
      await controller.GRNGetById(expect.any(String));
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        data: null,
        message: 'Get One Good Receive Note Failed',
      });
    }
  });

  it('should be getAll Good Receive note', async () => {
    expect(await controller.GRNList(expect.any(String))).toEqual({
      errors: null,
      status: 200,
      data: [sampleGRN],
      message: 'Get Good Receive Notes Success',
    });
  });

  it('should be get Paginate Good Receive note', async () => {
    mockGrnController.aggregate.mockReturnValue([
      { data: [sampleGRN], metadata: [{ total: 1 }] },
    ]);

    expect(
      await controller.GRNPaginate({
        buyerId: expect.any(String),
        skip: 0,
        limit: 10,
      }),
    ).toEqual({
      page: 0,
      limit: 10,
      data: [sampleGRN],
      count: 1,
    });
  });

  it('should be get Paginate Good Receive note Metadata Null', async () => {
    mockGrnController.aggregate.mockReturnValue([
      { data: [sampleGRN], metadata: [] },
    ]);

    expect(
      await controller.GRNPaginate({
        buyerId: expect.any(String),
        skip: 0,
        limit: 10,
      }),
    ).toEqual({
      count: 0,
      page: 0,
      limit: 10,
      data: [sampleGRN],
    });
  });

  it('should be get Paginate Good Receive failed', async () => {
    mockGrnController.aggregate.mockReturnValue(false);

    expect(
      await controller.GRNPaginate({
        buyerId: expect.any(String),
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

  it('should be getAll Good Receive note failed', async () => {
    mockGrnController.find.mockRejectedValue(new Error());

    try {
      await controller.GRNList(expect.any(String));
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        data: null,
        message: 'Get Good Receive Notes Failed',
      });
    }
  });

  it('should be update Good Receive Note', async () => {
    expect(await controller.GRNUpdate(expect.any(String), sampleGRN)).toEqual({
      errors: null,
      status: 200,
      data: sampleGRN,
      message: 'Save Good Receive Note Success',
    });
  });

  it('should be Reject Good Receive note', async () => {
    expect(
      await controller.GRNRejected(expect.any(String), {
        name: 'Rejected',
        timestamp: new Date(),
      }),
    ).toEqual({
      errors: null,
      status: 200,
      data: sampleGRN,
      message: 'Reject Good Receive Note Success',
    });
  });

  it('should be getAll Good Receive note failed', async () => {
    mockGrnController.findByIdAndUpdate.mockRejectedValue(new Error());

    try {
      await controller.GRNUpdate(expect.any(String), sampleGRN);
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        data: null,
        message: 'Save Good Receive Note Failed',
      });
    }
  });

  it('should be Reject Good Receive note failed', async () => {
    mockGrnController.findByIdAndUpdate.mockRejectedValue(new Error());

    try {
      await controller.GRNRejected(expect.any(String), {
        name: 'Rejected',
        timestamp: new Date(),
      });
    } catch (error) {
      expect(error).toEqual({
        errors: error,
        status: 400,
        data: null,
        message: 'Reject Good Receive Note Failed',
      });
    }
  });
});
