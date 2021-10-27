import { sampleGRN } from '../sample/GoodReceiveNote/Sample.Data.mocks';

export const mockGRNService = {
  findByIdAndUpdate: jest.fn().mockReturnValue(sampleGRN),
  find: jest.fn().mockReturnValue([sampleGRN]),
  findById: jest.fn().mockReturnValue(sampleGRN),
  aggregate: jest.fn().mockReturnValue([sampleGRN]),
};
