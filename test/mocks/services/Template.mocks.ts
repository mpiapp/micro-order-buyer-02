import { SampleTemplateCreate } from '../sample/Template/Sample.mocks';

export const mockServiceTemplate = {
  create: jest.fn().mockImplementation((dto) => dto),
  findByIdAndUpdate: jest.fn().mockImplementation((id) => {
    return id;
  }),
  updateOne: jest.fn().mockImplementation(() => {
    return {
      message: 'Update Success',
      status: true,
      id: expect.any(String),
    };
  }),
  find: jest.fn().mockResolvedValue([SampleTemplateCreate]),
  findById: jest.fn().mockResolvedValue(SampleTemplateCreate),
  aggregate: jest.fn().mockReturnValue([SampleTemplateCreate]),
};
