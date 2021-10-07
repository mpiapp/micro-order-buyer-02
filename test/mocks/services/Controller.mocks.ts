import { sampleItem } from '../sample/Products/sample.item.mock';
import { SampleCreate } from '../sample/Purchase-Request/sample.data.create.mock';

export const mockControllerPurchaseRequest = {
  findByIdAndUpdate: jest.fn().mockImplementation(() => {
    SampleCreate.items.push(sampleItem);
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
};
