import { PRCreateDto } from './../../../src/purchase-request/dto/CreatePR.dto';
import { PRUpdateDto } from './../../../src/purchase-request/dto/UpdatePR.dto';
import { SampleCreate } from '../sample/Purchase-Request/sample.data.create.mock';

export const mockPurchaseRequest = {
  create: jest.fn().mockImplementation((param: PRCreateDto) => param),
  findByIdAndUpdate: jest
    .fn()
    .mockImplementation((id: string, param: PRUpdateDto) => {
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
