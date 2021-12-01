import { sampleDataCreatePO } from '../sample/Purchase-Order/sample.data.search.mock';
import { SampleCreate } from '../sample/Purchase-Request/sample.data.create.mock';
import { SampleTemplateCreate } from '../sample/Template/Sample.mocks';
import { mockGRNService } from './GRN.mocks';

export const mockControllerPurchaseRequest = {
  findByIdAndUpdate: jest.fn().mockImplementation(() => {
    return SampleCreate;
  }),
  updateOne: jest.fn().mockImplementation(() => {
    return {
      message: 'Update Success',
      status: true,
      id: expect.any(String),
    };
  }),
  create: jest.fn().mockImplementation((SampleCreate) => {
    return SampleCreate;
  }),
  findOne: jest.fn().mockImplementation(() => {
    return false;
  }),
  findById: jest.fn().mockReturnValue(SampleCreate),
  find: jest.fn().mockReturnValue([SampleCreate]),
  aggregate: jest.fn().mockReturnValue([SampleCreate]),
};

export const mockControllerTemplate = {
  create: jest.fn().mockImplementation((dto) => {
    return dto;
  }),
  findByIdAndUpdate: jest.fn().mockImplementation(() => {
    return true;
  }),
  updateOne: jest.fn().mockImplementation(() => {
    return true;
  }),
  find: jest.fn().mockReturnValue([SampleTemplateCreate]),
  findById: jest.fn().mockReturnValue(SampleTemplateCreate),
  aggregate: jest.fn().mockReturnValue(SampleTemplateCreate),
};

export const mockControllerPurchaseOrder = {
  create: jest.fn().mockImplementation(() => {
    return sampleDataCreatePO;
  }),
  findByIdAndUpdate: jest.fn().mockImplementation(() => {
    return SampleCreate;
  }),
  findById: jest.fn().mockReturnValue(sampleDataCreatePO),
  find: jest.fn().mockReturnValue([sampleDataCreatePO]),
  aggregate: jest.fn().mockReturnValue([sampleDataCreatePO]),
};

export const mockGrnController = {
  ...mockGRNService,
};
