import { sample_status } from './../sample/Status/sample.data.mocks';

export const mockStatusService = {
  findByIdAndUpdate: jest.fn().mockReturnValue(sample_status),
  findOneAndUpdate: jest.fn().mockReturnValue(sample_status),
};
