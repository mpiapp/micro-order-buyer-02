import { SampleCreate } from '../sample/Purchase-Request/sample.data.create.mock';
import { OrderCreateDto } from './../../../src/config/dto/order-create.dto';
import { OrderUpdateDto } from './../../../src/config/dto/order-update.dto';

export const mockPurchaseRequest = {
  create: jest.fn().mockImplementation((param: OrderCreateDto) => param),
  findByIdAndUpdate: jest
    .fn()
    .mockImplementation((id: string, param: OrderUpdateDto) => {
      return {
        ...param,
        id,
      };
    }),
  delete: jest.fn().mockImplementation((id: string) => {
    return { id };
  }),
  find: jest.fn().mockReturnValue([SampleCreate]),
  findById: jest.fn().mockReturnValue(SampleCreate),
};
