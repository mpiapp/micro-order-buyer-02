import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Order } from './../../../../../database/schema/orders.schema';
import { ProofPaymentService } from './../proof.payment.package.service';

const mockProofPayment = {
  updateOne: jest.fn().mockImplementation(() => {
    return {
      message: 'Update Success',
      status: true,
      id: expect.any(String),
    };
  }),
  findOneAndUpdate: jest.fn().mockImplementation(() => {
    return {
      message: 'Update Success',
      status: true,
      id: expect.any(String),
    };
  }),
  find: jest.fn().mockReturnValue(true),
};
describe('ProofPaymentService', () => {
  let service: ProofPaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProofPaymentService,
        {
          provide: getModelToken(Order.name),
          useValue: mockProofPayment,
        },
      ],
    }).compile();

    service = module.get<ProofPaymentService>(ProofPaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be upload file', async () => {
    expect(
      await service.upload({
        id: expect.any(String),
        fileUrl: 'PICK-XXX-001',
        uploader: 'name',
      }),
    ).toEqual({
      message: 'Update Success',
      status: true,
      id: expect.any(String),
    });
  });

  it('should check field down payment', async () => {
    expect(await service.checking(expect.any(String))).toEqual(true);
  });

  it('should be approval', async () => {
    expect(
      await service.approved({
        id: expect.any(String),
        name: 'PICK-XXX-001',
        nominal: 113,
      }),
    ).toEqual({
      message: 'Update Success',
      status: true,
      id: expect.any(String),
    });
  });
});
