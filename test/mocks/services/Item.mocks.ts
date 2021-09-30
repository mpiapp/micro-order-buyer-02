import { SampleItem } from '../sample/Items/sample.add.items.mock';
import { SampleCreate } from '../sample/Purchase-Request/sample.data.create.mock';

export const mockItemPurchaseRequest = {
  findByIdAndUpdate: jest.fn().mockImplementation(() => {
    SampleCreate.products.push(SampleItem);
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
