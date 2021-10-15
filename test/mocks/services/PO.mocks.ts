import { sampleDataCreatePO } from '../sample/Purchase-Order/sample.data.search.mock';

export const mockPurchaseOrder = {
  create: jest.fn().mockImplementation((dto) => {
    return dto;
  }),
  findByIdAndUpdate: jest.fn().mockImplementation(() => {
    return {
      ...sampleDataCreatePO,
      isDeleted: true,
    };
  }),
  find: jest.fn().mockReturnValue([sampleDataCreatePO]),
  findById: jest.fn().mockReturnValue(sampleDataCreatePO),
};
