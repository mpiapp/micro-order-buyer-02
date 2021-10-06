import { sampleItem } from '../sample/Products/sample.item.mock';
import { SampleCreate } from '../sample/Purchase-Request/sample.data.create.mock';

export const mockItemPurchaseRequest = {
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
};
